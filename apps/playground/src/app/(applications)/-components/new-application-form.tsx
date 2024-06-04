import {ApplicationIcon} from '@cosmonic/orbit-icons';
import {
  PageHeader,
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  FormDescription,
  FormMessage,
  DragAndDropInput,
  FormControl,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@cosmonic/orbit-ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {useNavigate, useSearch} from '@tanstack/react-router';
import {type ApplicationManifest} from '@wasmcloud/lattice-client-core';
import {dump} from 'js-yaml';
import {ExternalLinkIcon, ListRestartIcon, Loader2Icon} from 'lucide-react';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {applicationManifestQueryOptions} from '@/services/lattice-queries/applications/get-application-manifest';
import {applicationVersionsQueryOptions} from '@/services/lattice-queries/applications/get-application-versions';
import {usePutApplicationMutation} from '@/services/lattice-queries/applications/put-application';
import {extractApplicationData} from '../-helpers/extract-application-data';

const YamlEditor = React.lazy(async () =>
  import('../../../components/yaml-editor').then((module) => ({default: module.YamlEditor})),
);

const formSchema: z.ZodType<{yamlManifest: string}> = z.object({
  yamlManifest: z.string().min(1, 'YAML Manifest is required'),
});

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

function NewApplicationForm(): React.ReactElement {
  const navigate = useNavigate();
  const search = useSearch({from: '/applications/new'});
  const [loading, setLoading] = React.useState<'NONE' | 'SAVE' | 'SAVE_DEPLOY'>('NONE');

  const defaultValues = React.useMemo<FormInput>(
    () => ({
      yamlManifest: '',
    }),
    [],
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const existingAppName = search['app-name'];
  const existingAppVersion = search['app-version'];
  const existingManifestQuery = useQuery({
    ...applicationManifestQueryOptions(existingAppName ?? ''),
    enabled: Boolean(existingAppName),
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const existingManifestYaml = React.useMemo(
    () => dump(existingManifestQuery.data ?? ''),
    [existingManifestQuery.data],
  );

  React.useEffect(() => {
    if (existingManifestYaml) {
      form.setValue('yamlManifest', existingManifestYaml);
    }
  }, [existingManifestYaml, form]);

  React.useEffect(() => {
    if (existingManifestQuery.data && !existingAppVersion) {
      const latestVersion = existingManifestQuery.data?.metadata.annotations.version;
      if (latestVersion && latestVersion !== existingAppVersion) {
        void navigate({
          to: '/applications/new',
          search: {
            ...search,
            'app-version': latestVersion,
          },
          replace: true,
        });
      }
    }
  }, [existingAppVersion, existingManifestQuery.data, navigate, search]);

  const remoteManifestUrl = search.manifest;
  const remoteManifest = useQuery({
    enabled: Boolean(remoteManifestUrl),
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    queryKey: ['applications', {view: 'remote-manifest', url: remoteManifestUrl}] as const,
    async queryFn() {
      if (!remoteManifestUrl) return;
      const response = await fetch(remoteManifestUrl);
      if (response.ok) return response.text();
      throw new Error(`Failed to fetch manifest: ${response.statusText || response.status}`);
    },
  });

  React.useEffect(() => {
    if (remoteManifest.data) {
      form.setValue('yamlManifest', remoteManifest.data);
    }
  }, [form, remoteManifest.data]);

  const [manifest, setManifest] = React.useReducer<
    React.Reducer<{model: ReturnType<typeof extractApplicationData>; error?: string}, string>
  >(
    (existing, newModel) => {
      try {
        return {model: extractApplicationData(newModel)};
      } catch (error) {
        if (error instanceof Error) {
          return {model: {}, error: error.message};
        }
      }

      return existing;
    },
    {model: {}},
  );

  const yamlManifest = form.watch('yamlManifest');
  React.useEffect(() => {
    setManifest(yamlManifest);
  }, [yamlManifest]);

  const showManifestError = React.useDeferredValue(yamlManifest && manifest.error);

  const putMutation = usePutApplicationMutation({
    onSuccess(data, variables) {
      const manifest = extractApplicationData(variables.yaml);
      void navigate({to: '/applications/detail/$appName', params: {appName: manifest.name ?? ''}});
    },
  });

  React.useEffect(() => {
    if (!putMutation.isPending) setLoading('NONE');
  }, [putMutation.isPending]);

  const handleSave = React.useMemo(
    () =>
      form.handleSubmit((data: FormOutput): void => {
        setLoading('SAVE');
        putMutation.mutate({yaml: data.yamlManifest});
      }),
    [form, putMutation],
  );

  const handleSaveAndDeploy = React.useMemo(
    () =>
      form.handleSubmit((data: FormOutput): void => {
        setLoading('SAVE_DEPLOY');
        putMutation.mutate({yaml: data.yamlManifest, autoDeploy: true});
      }),
    [form, putMutation],
  );

  const yamlFieldValue = React.useMemo(
    () => remoteManifest.data ?? existingManifestYaml ?? defaultValues.yamlManifest,
    [remoteManifest.data, existingManifestYaml, defaultValues.yamlManifest],
  );

  const resetToExistingContent = React.useCallback(() => {
    if (existingManifestYaml) {
      form.setValue('yamlManifest', existingManifestYaml);
    }
  }, [form, existingManifestYaml]);

  const shouldShowReset = yamlFieldValue !== form.getValues('yamlManifest');

  return (
    <div className="flex h-full flex-col">
      <div className="container mx-auto max-w-screen-xl shrink-0">
        <PageHeader
          className="flex-col space-y-3 md:flex-row md:space-y-0"
          title={
            <div className="flex items-center gap-2">
              <ApplicationIcon />
              <div>New Application</div>
            </div>
          }
          right={
            <div className="flex w-full space-x-2">
              <Button size="sm" variant="secondary" onClick={handleSave}>
                {loading === 'SAVE' && <Loader2Icon className="mr-2 size-4 animate-spin" />}
                Save
              </Button>
              <Button size="sm" onClick={handleSaveAndDeploy}>
                {loading === 'SAVE_DEPLOY' && <Loader2Icon className="mr-2 size-4 animate-spin" />}
                Save & Deploy
              </Button>
            </div>
          }
        />
      </div>
      <div className="shrink grow basis-0">
        <Form {...form}>
          <form
            className="grid h-full grid-cols-12 border-t border-border"
            data-test-id="new-application-form"
          >
            <div className="col-span-12 overflow-visible border-border bg-background md:col-span-6 md:border-e lg:col-span-7">
              <FormField
                name="yamlManifest"
                control={form.control}
                render={({field}) => (
                  <FormItem className="flex h-full flex-col">
                    <div className="container mx-auto mb-2 mt-4 max-w-screen-xl shrink-0 space-y-2">
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <FormLabel>Wadm Manifest</FormLabel>
                        {existingAppName && (
                          <div className="flex items-center">
                            {shouldShowReset && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="xs"
                                    className="-my-2 mr-1 h-auto p-1"
                                    type="button"
                                    onClick={resetToExistingContent}
                                  >
                                    <ListRestartIcon className="size-4" strokeWidth={1.5} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Reset content to version{' '}
                                  <code className="font-normal">{existingAppVersion}</code>
                                </TooltipContent>
                              </Tooltip>
                            )}
                            <ExistingVersionPicker
                              name={existingAppName}
                              query={existingManifestQuery}
                            />
                          </div>
                        )}
                      </div>
                      <FormDescription>
                        Enter your application manifest in YAML format.
                      </FormDescription>
                      <FormMessage />

                      {remoteManifestUrl && (
                        <div className="text-xs">
                          {remoteManifest.isFetching && <div>Loading remote manifest...</div>}
                          {remoteManifest.isError && (
                            <div className="font-medium text-destructive" role="alert">
                              {remoteManifest.error instanceof Error &&
                                remoteManifest.error.message}
                            </div>
                          )}
                          {remoteManifest.data && (
                            <>
                              Remote Manifest loaded from
                              <a
                                className="underline"
                                href={remoteManifestUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {remoteManifestUrl}{' '}
                                <ExternalLinkIcon size={12} className="inline-block" />
                              </a>
                            </>
                          )}
                        </div>
                      )}

                      <div className="font-medium text-destructive" role="alert">
                        {showManifestError && (
                          <pre className="overflow-auto">
                            <code className="text-[0.8rem]">{manifest.error}</code>
                          </pre>
                        )}
                      </div>
                    </div>
                    <div className="min-h-0 grow">
                      <DragAndDropInput
                        className="absolute left-0 top-0 z-10 size-full"
                        onDropInput={field.onChange}
                      >
                        Drop WADM manifest (YAML) here to edit
                      </DragAndDropInput>
                      <FormControl>
                        <React.Suspense fallback={<div />}>
                          <YamlEditor {...field} defaultValue={yamlFieldValue} />
                        </React.Suspense>
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 overflow-auto md:col-span-6 lg:col-span-5">
              <div className="container mx-auto my-4 max-w-screen-xl">
                <div className="flex flex-row items-center justify-between">
                  <div className="text-lg font-medium">Summary</div>
                </div>
                {putMutation.isError && (
                  <div className="font-medium text-destructive" role="alert">
                    <span>Oops. That didn&rsquo;t work...</span>
                    <div className="text-[0.8rem]">
                      {putMutation.error instanceof Error && putMutation.error.message}
                    </div>
                  </div>
                )}
                <div
                  className="mt-4 flex flex-col space-y-5"
                  data-test-id="new-application-form-summary"
                >
                  <div className="flex flex-col space-y-1">
                    <div className="text-xs font-semibold uppercase tracking-wide">Name</div>
                    <div>{manifest.model?.name ?? '...'}</div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="text-xs font-semibold uppercase tracking-wide">Version</div>
                    <div>{manifest.model?.version ?? '...'}</div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="text-xs font-semibold uppercase tracking-wide">Description</div>
                    <div>{manifest.model?.description ?? '...'}</div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="text-xs font-semibold uppercase tracking-wide">
                      Actor Components
                    </div>
                    <div>{manifest.model?.components?.length ?? '0'}</div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="text-xs font-semibold uppercase tracking-wide">Providers</div>
                    <div>{manifest.model?.providers?.length ?? '0'}</div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="text-xs font-semibold uppercase tracking-wide">
                      Link Definitions
                    </div>
                    <div>{manifest.model?.links?.length ?? '0'}</div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

function ExistingVersionPicker({
  name,
  query,
}: {
  readonly name: string | undefined;
  readonly query: UseQueryResult<ApplicationManifest | undefined>;
}): React.ReactElement {
  const search = useSearch({from: '/applications/new'});
  const navigate = useNavigate();
  const versionsQuery = useQuery(applicationVersionsQueryOptions(name ?? ''));

  const versions = React.useMemo(
    () => versionsQuery.data?.map((h) => h.version) ?? [],
    [versionsQuery.data],
  );
  const version = search['app-version'] ?? '';
  const setVersion = React.useCallback(
    (newVersion: string) => {
      void navigate({
        from: '/applications/new',
        params: {
          ...search,
          'app-version': newVersion,
        },
        replace: true,
      });
    },
    [navigate, search],
  );

  return (
    <div className="text-xs">
      {query.isError ? (
        <div className="font-medium text-destructive" role="alert">
          {query.error instanceof Error && query.error.message}
        </div>
      ) : (
        <div>
          Using manifest from{' '}
          <Select value={version} disabled={query.isLoading} onValueChange={setVersion}>
            <SelectTrigger
              className="inline-flex size-auto border-0 p-0 text-xs"
              aria-label="version"
            >
              {query.isLoading ? (
                <SelectValue placeholder="Loading..." />
              ) : (
                <>
                  <code>{name}</code>@<SelectValue placeholder="Select a Host" />
                </>
              )}
            </SelectTrigger>
            <SelectContent className="text-xs" align="end">
              {versions.map((version) => (
                <SelectItem key={version} value={version} className="text-xs">
                  <code className="font-normal">{version}</code>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

export {NewApplicationForm};

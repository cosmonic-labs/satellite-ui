import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  cn,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SheetFooter,
} from '@cosmonic/orbit-ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {canConnect, type LatticeClientOptions} from '@wasmcloud/lattice-client-core';
import {LoaderCircleIcon} from 'lucide-react';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {useDebounceValue} from 'usehooks-ts';
import {z} from 'zod';
import {useLatticeSelector} from '@/context/lattice-client/use-lattice-selector';
import {LatticeStatus} from './lattice-status';

const latticeSettingsSchema = z.object({
  key: z.string().min(1),
  name: z.string().min(1),
  latticeUrl: z
    .string()
    .url()
    .refine(async (url) => canConnect(url), 'Unable to connect to the provided URL'),
  retryCount: z.number().min(0).optional(),
  latticeId: z.string().optional(),
  ctlTopicPrefix: z.string().optional(),
  wadmTopicPrefix: z.string().optional(),
});

type LatticeSchemaFormInput = z.input<typeof latticeSettingsSchema>;
type LatticeSchemaFormOutput = z.output<typeof latticeSettingsSchema>;
type LatticeSettingsFormProps = React.HTMLProps<HTMLFormElement> & {
  readonly latticeKey: string;
  readonly latticeName: string;
  readonly latticeClientConfig: LatticeClientOptions['config'];
  readonly closeButton?: React.ReactNode;
  readonly onSuccess?: () => void;
};

const LatticeSettingsForm = React.forwardRef<HTMLFormElement, LatticeSettingsFormProps>(
  ({latticeKey, latticeName, latticeClientConfig, closeButton, onSuccess, className}, ref) => {
    const {updateEntry} = useLatticeSelector();

    const form = useForm<LatticeSchemaFormInput, Record<string, unknown>, LatticeSchemaFormOutput>({
      resolver: zodResolver(latticeSettingsSchema),
      defaultValues: {
        key: latticeKey,
        name: latticeName,
        latticeUrl: latticeClientConfig.latticeUrl,
        retryCount: latticeClientConfig.retryCount,
        latticeId: latticeClientConfig.latticeId,
        ctlTopicPrefix: latticeClientConfig.ctlTopicPrefix,
        wadmTopicPrefix: latticeClientConfig.wadmTopicPrefix,
      },
    });

    const latticeUrl = form.watch('latticeUrl');
    const [debouncedUrl, setDebouncedUrl] = useDebounceValue(latticeUrl, 500);

    React.useEffect(() => {
      setDebouncedUrl(latticeUrl);
    }, [latticeUrl, setDebouncedUrl]);

    const handleSubmit = form.handleSubmit(async (data) => {
      updateEntry(latticeKey, {
        name: data.name,
        config: {
          latticeUrl: data.latticeUrl,
          retryCount: data.retryCount ?? latticeClientConfig.retryCount,
          latticeId: data.latticeId ?? latticeClientConfig.latticeId,
          ctlTopicPrefix: data.ctlTopicPrefix ?? latticeClientConfig.ctlTopicPrefix,
          wadmTopicPrefix: data.wadmTopicPrefix ?? latticeClientConfig.wadmTopicPrefix,
        },
      });
      onSuccess?.();
    });

    return (
      <Form {...form}>
        <form
          ref={ref}
          className={cn(`flex flex-col gap-8 py-4`, className)}
          onSubmit={handleSubmit}
        >
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Lattice Name</FormLabel>
                <FormDescription>
                  Friendly name for the lattice connection. This is only used for display purposes.
                </FormDescription>
                <FormControl>
                  <Input type="text" {...field} data-1p-ignore autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="latticeUrl"
            render={({field}) => (
              <FormItem>
                <FormLabel>Lattice URL</FormLabel>
                <FormDescription>
                  URL of the websocket server for the lattice connection.
                </FormDescription>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage>
                  <LatticeStatus url={debouncedUrl} />
                </FormMessage>
              </FormItem>
            )}
          />

          <Accordion collapsible type="single" className="-mt-4">
            <AccordionItem value="advanced">
              <AccordionTrigger>Advanced Settings</AccordionTrigger>
              <AccordionContent className="space-y-8 py-4 data-[state=closed]:overflow-hidden data-[state=open]:overflow-visible">
                <p className="text-sm">
                  Settings in this section typically only need to be adjusted if you have modified
                  your wasmCloud deployment (for example, by following the{' '}
                  <a
                    className="text-primary underline"
                    href="https://wasmcloud.com/docs/deployment/lattice/"
                  >
                    wasmCloud Operator Guide
                  </a>
                  .)
                </p>
                <FormField
                  control={form.control}
                  name="latticeId"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Lattice ID</FormLabel>
                      <FormDescription>The ID of your wasmCloud lattice</FormDescription>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ctlTopicPrefix"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Control Topic Prefix (Lattice Prefix)</FormLabel>
                      <FormDescription>
                        Prepended to lattice topics. For example:{' '}
                        <code>{'{prefix}.ctl.{lattice-id}.>'}</code>
                      </FormDescription>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wadmTopicPrefix"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Wadm Topic Prefix</FormLabel>
                      <FormDescription>
                        Used in Wadm API topics. For example:{' '}
                        <code>{'{wadm-prefix}.api.{lattice-id}.>'}</code>
                      </FormDescription>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="retryCount"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Retry Count</FormLabel>
                      <FormDescription>
                        How many times to retry connecting to the lattice before giving up.
                      </FormDescription>
                      <FormControl>
                        <Input type="number" min="0" step="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <SheetFooter>
            <Button type="submit">
              {form.formState.isSubmitting ? (
                <LoaderCircleIcon className="mx-0.5 size-4 animate-spin" />
              ) : null}
              Save
            </Button>
            {closeButton}
          </SheetFooter>
        </form>
      </Form>
    );
  },
);

LatticeSettingsForm.displayName = 'LatticeSettingsForm';

export {LatticeSettingsForm};

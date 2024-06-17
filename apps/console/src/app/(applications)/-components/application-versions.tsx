import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
  buttonVariants,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@cosmonic/orbit-ui';
import {useQuery} from '@tanstack/react-query';
import {Link} from '@tanstack/react-router';
import {
  type ApplicationHistory,
  DeploymentStatus,
  type ApplicationDetail,
} from '@wasmcloud/lattice-client-core';
import {dump} from 'js-yaml';
import {ChevronDownIcon, MenuIcon} from 'lucide-react';
import * as React from 'react';
import {useDeleteApplicationMutation} from '@/services/lattice-queries/applications/delete-application';
import {useDeployApplicationMutation} from '@/services/lattice-queries/applications/deploy-application';
import {applicationManifestQueryOptions} from '@/services/lattice-queries/applications/get-application-manifest';
import {useUndeployApplicationMutation} from '@/services/lattice-queries/applications/undeploy-application';

const YamlEditor = React.lazy(async () =>
  import('@/components/yaml-editor').then((module) => ({
    default: module.YamlEditor,
  })),
);

type ApplicationVersionsProps = {
  readonly application: ApplicationDetail;
};

function ApplicationVersions({application}: ApplicationVersionsProps): React.ReactElement {
  const history = application.versions?.slice().reverse() ?? [];

  return (
    <div className="grid w-full grid-cols-[auto_auto_1fr]">
      <div className="w-[5.5rem]">
        {application.status.status.type === DeploymentStatus.Undeployed && (
          <div className="mt-1.5">
            <Badge variant="secondary">Undeployed</Badge>
          </div>
        )}
      </div>
      <div className="pointer-events-none relative z-0 mx-3 mb-6 mt-1">
        <div className="mx-1 mt-3 size-3 rounded-full border-2 border-background/70 bg-primary/50" />
        <div className="absolute left-1/2 top-6 -z-10 h-[calc(100%_+_0.75rem)] -translate-x-1/2 border border-dashed border-primary/30 group-last:hidden" />
      </div>
      <div className="my-2">
        <Button asChild variant="outline" size="xs">
          <Link
            to="/applications/new"
            search={{
              'app-name': application.manifest.metadata.name,
              'app-version': application.status.version,
            }}
          >
            Create New Version
          </Link>
        </Button>
      </div>
      {history.map((item, index) => (
        <VersionEntry key={index} item={item} name={application.manifest.metadata.name ?? ''} />
      ))}
    </div>
  );
}

type VersionEntryProps = {
  readonly item: ApplicationHistory[number];
  readonly name: string;
};

function VersionEntry({item: {deployed, version}, name}: VersionEntryProps): React.ReactElement {
  const deploy = useDeployApplicationMutation();
  const undeploy = useUndeployApplicationMutation();
  const del = useDeleteApplicationMutation();

  const manifestQuery = useQuery({
    ...applicationManifestQueryOptions(name, version),
    enabled: false,
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
  const yaml = React.useMemo(() => dump(manifestQuery.data), [manifestQuery.data]);

  const handleExpand = React.useCallback(async () => {
    await manifestQuery.refetch();
  }, [manifestQuery]);

  const handleDeploy = React.useCallback(() => {
    deploy.mutate({name, version});
  }, [deploy, name, version]);

  const handleUndeploy = React.useCallback(() => {
    undeploy.mutate({name});
  }, [undeploy, name]);

  const handleDelete = React.useCallback(() => {
    del.mutate({name, version});
  }, [del, name, version]);

  return (
    <div className="group contents">
      <div className="mt-1 text-right">{deployed && <Badge variant="default">Deployed</Badge>}</div>
      <div role="presentation" className="relative z-0 px-3 pb-6">
        <div className="mx-1 mt-3 size-3 rounded-full border-2 border-background/70 bg-primary" />
        <div className="absolute left-1/2 top-6 -z-10 h-full -translate-x-1/2 border border-primary/50 group-last:hidden" />
      </div>
      <Collapsible className="mb-6 mt-1">
        <div>
          <div className="flex items-center gap-2">
            <div className="font-medium">{version}</div>

            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="xs" aria-label={`Actions for ${name}`}>
                    <MenuIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem onClick={deployed ? handleUndeploy : handleDeploy}>
                    {deployed ? 'Undeploy' : 'Deploy'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="focus:bg-destructive/20">Delete</DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-4">
                    This will permanently delete version {version} of {name}. This action cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className={buttonVariants({variant: 'destructive'})}
                    onClick={handleDelete}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          {/* <div className="text-sm">{manifest?.annotations?.changes ?? ''}</div> */}
          <CollapsibleTrigger className="group/collapse" onClick={handleExpand}>
            <div className="mt-3 flex items-center text-sm font-medium text-foreground/70">
              <div>View Source YAML</div>
              <ChevronDownIcon className="ms-1 size-3 -rotate-90 group-data-[state=open]/collapse:rotate-0" />
            </div>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="mt-3 h-[50vh] border border-border">
            {manifestQuery.isFetching && <div className="text-center">Loading...</div>}
            <React.Suspense fallback={<div className="text-center">Loading...</div>}>
              {yaml && <YamlEditor disabled defaultValue={yaml} />}
            </React.Suspense>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export {ApplicationVersions};

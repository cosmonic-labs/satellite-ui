import {ApplicationIcon} from '@cosmonic/orbit-icons';
import {cn, PageHeader} from '@cosmonic/orbit-ui';
import {useQuery} from '@tanstack/react-query';
import {createFileRoute, Outlet, redirect, useParams, useRouterState} from '@tanstack/react-router';
import {DeploymentStatus} from '@wasmcloud/lattice-client-core';
import {cva} from 'class-variance-authority';
import {VersionStatusBadge} from '@/app/(applications)/-components/version-status-badge';
import {applicationDetailQueryOptions} from '@/services/lattice-queries/applications/get-application-detail';

export const Route = createFileRoute('/(applications)/applications/detail')({
  beforeLoad({location}) {
    if (location.pathname === '/applications/detail') {
      throw redirect({to: '/applications', statusCode: 301});
    }
  },
  component: () => <ApplicationDetail />,
});

const statusGlowStyles = cva(
  'pointer-events-none absolute right-0 top-0 -z-10 h-64 w-full bg-gradient-to-bl via-20% to-transparent to-50% transition-all dark:opacity-30',
  {
    variants: {
      status: {
        reconciling: 'from-yellow-300 via-yellow-300/30',
        deployed: 'from-green-500 via-green-500/30',
        failed: 'from-red-300 via-red-300/30',
        undeployed: 'from-gray-400 via-gray-400/30',
        unknown: 'from-gray-400 via-gray-400/30',
      },
    },
  },
);

function ApplicationDetail(): React.ReactElement {
  const {isLoading} = useRouterState();
  const {appName} = useParams({from: '/(applications)/applications/detail/$appName'});
  const {data: application} = useQuery(applicationDetailQueryOptions(appName));

  const deployedVersion = application?.status.version ?? 'N/A';
  const status: DeploymentStatus = application?.status.status.type ?? 'unknown';
  const name = application?.manifest.metadata.name ?? appName;

  return (
    <div className="relative z-0 mb-12 flex flex-col">
      <div className={cn(statusGlowStyles({status}))} />
      <div className="container mx-auto">
        <PageHeader
          title={
            <div className="flex items-center gap-2">
              <ApplicationIcon />
              <div>{name}</div>
            </div>
          }
          right={
            isLoading ? undefined : (
              <div className="w-full">
                <VersionStatusBadge status={status} version={deployedVersion} />
              </div>
            )
          }
        />
      </div>
      <Outlet />
    </div>
  );
}

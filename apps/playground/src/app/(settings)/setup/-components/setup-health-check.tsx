import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  cn,
} from '@cosmonic/orbit-ui';
import {useQuery} from '@tanstack/react-query';
import {Link} from '@tanstack/react-router';
import {canConnect} from '@wasmcloud/lattice-client-core';
import {cva} from 'class-variance-authority';
import {
  ChevronRightIcon,
  CircleCheckBigIcon,
  CircleDashed,
  CircleXIcon,
  LoaderCircleIcon,
} from 'lucide-react';
import * as React from 'react';
import {useLatticeClient} from '@/context/lattice-client/use-lattice-client';
import {listApplicationsQueryOptions} from '@/services/lattice-queries/applications/list-application';
import {listHostsQueryOptions} from '@/services/lattice-queries/hosts/list-hosts';
import {SetupScrollerButton} from './setup-scroller';

type Check = 'pending' | 'checking' | 'success' | 'failure';

function determineStep(
  latticeCheck: Check,
  hostCheck: Check,
  applicationCheck: Check,
): 'lattice' | 'hosts' | 'applications' | undefined {
  if (latticeCheck === 'failure') return 'lattice';
  if (hostCheck === 'failure') return 'hosts';
  if (applicationCheck === 'failure') return 'applications';
  if (applicationCheck === 'success') return 'applications';
  return undefined;
}

function SetupHealthCheck() {
  // const latticeCheck = 'success';
  const latticeCheck = useLatticeCheck();
  const [hostCheck, hostCount] = useHostCheck(latticeCheck === 'success');
  const [applicationCheck, appCount] = useApplicationCheck(hostCheck === 'success');
  const step = determineStep(latticeCheck, hostCheck, applicationCheck);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-lg">Welcome to the wasmCloud Playground!</h1>
        <p className="text-sm">Hold tight while we check on a few things.</p>
      </div>
      <Accordion collapsible type="single" value={step}>
        <AccordionItem value="lattice" className="group" data-check={latticeCheck}>
          <AccordionTrigger disabled className="-mb-3 border-b-0">
            <CheckStep
              check={latticeCheck}
              pending="Check connection to lattice"
              checking="Checking connection to lattice..."
              success="Connected to lattice"
              failure="Failed to connect to lattice"
            />
          </AccordionTrigger>
          <AccordionContent className="-mb-3 ms-2 border-l-2 border-destructive/50 pb-3 ps-4 pt-2">
            <p className="mb-4">
              The wasmCloud Playground requires a connection to a running lattice instance. If you
              have the{' '}
              <a
                href="https://wasmcloud.com/docs/getting-started"
                className="text-primary underline"
                target="_blank"
                rel="noopener"
              >
                wasmCloud Shell
              </a>{' '}
              installed, you can start one by running{' '}
              <code className="rounded border bg-muted px-0.5">wash up</code> in your terminal. If
              you already have a lattice running, you can configure the connection settings here.
            </p>
            <div className="flex items-center gap-2">
              <SetupScrollerButton isNext size="sm">
                Lattice Settings <ChevronRightIcon className="-me-1 ms-1 size-4" />
              </SetupScrollerButton>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hosts" className="group" data-check={hostCheck}>
          <AccordionTrigger disabled className="-mb-3 border-b-0">
            <CheckStep
              check={hostCheck}
              pending="Check for running hosts"
              checking="Checking for running hosts..."
              success={`Found ${hostCount} wasmCloud host${hostCount === 1 ? '' : 's'}`}
              failure="Couldn&rsquo;t find any running hosts"
            />
          </AccordionTrigger>
          <AccordionContent className="-mb-3 ms-2 border-l-2 border-destructive/50 pb-3 ps-4 pt-2">
            <p className="mb-4 text-sm">
              The wasmCloud Playground requires at least one running host to deploy applications to.
              If you don&rsquo;t have any running, you can start one by running <code>wash up</code>{' '}
              in your terminal.
            </p>
            <div className="flex items-center gap-2">
              <Button asChild size="sm">
                {/* // TODO: Update to point to /applications/new/template when it is fixed */}
                <Link to="/applications/new">New Application</Link>
              </Button>
              <SetupScrollerButton isNext size="sm" variant="secondary">
                Lattice Settings <ChevronRightIcon className="-me-1 ms-1 size-4" />
              </SetupScrollerButton>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="applications" className="group" data-check={applicationCheck}>
          <AccordionTrigger disabled className="-mb-3 border-b-0">
            <CheckStep
              isSoftFail
              check={applicationCheck}
              pending="Check for running applications"
              checking="Checking for running applications..."
              success={`Found ${appCount} running application${appCount === 1 ? '' : 's'}`}
              failure="Couldn&rsquo;t find any running applications"
            />
          </AccordionTrigger>
          <AccordionContent
            className={`ms-2 border-l-2 ps-4 pt-2 ${applicationCheck === 'success' ? 'border-primary/50' : 'border-border'}`}
          >
            {applicationCheck === 'failure' && (
              <div>
                <p className="mb-4">
                  Looks like you&rsquo;re ready to deploy your first application! You can deploy
                  applications here or by following one of our examples or tutorials.
                </p>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm">
                    {/* // TODO: Update to point to /applications/new/template when it is fixed */}
                    <Link to="/applications/new">New Application</Link>
                  </Button>
                  <SetupScrollerButton isNext size="sm" variant="secondary">
                    Lattice Settings <ChevronRightIcon className="-me-1 ms-1 size-4" />
                  </SetupScrollerButton>
                </div>
              </div>
            )}
            {applicationCheck === 'success' && (
              <div>
                <p className="mb-4">
                  Looks like you&rsquo;ve already got an application running! Keep doing what
                  you&rsquo;re doing!
                </p>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm">
                    <Link to="/applications">Manage Applications</Link>
                  </Button>
                  <SetupScrollerButton isNext size="sm" variant="secondary">
                    Lattice Settings <ChevronRightIcon className="-me-1 ms-1 size-4" />
                  </SetupScrollerButton>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

const preVariant = cva(
  'absolute left-1 top-full mx-[0.2rem] my-1 block h-3 border group-last:hidden group-data-[state=open]:hidden',
  {
    variants: {
      check: {
        pending: 'border-border',
        checking: 'border-border',
        success: 'border-primary/50',
        failure: 'border-destructive',
      },
    },
  },
);

function CheckStep({
  check,
  pending,
  checking,
  success,
  failure,
  isSoftFail = false,
}: {
  readonly check: Check;
  readonly pending: React.ReactNode;
  readonly checking: React.ReactNode;
  readonly success: React.ReactNode;
  readonly failure: React.ReactNode;
  readonly isSoftFail?: boolean;
}) {
  const CheckIcon = {
    pending: () => <CircleDashed className="size-4 text-muted-foreground" />,
    checking: () => <LoaderCircleIcon className="size-4 animate-spin text-primary" />,
    success: () => <CircleCheckBigIcon className="size-4 text-primary" />,
    failure: () =>
      isSoftFail ? (
        <CircleXIcon className="size-4 text-muted-foreground" />
      ) : (
        <CircleXIcon className="size-4 text-destructive" />
      ),
  }[check];
  const text = {
    pending,
    checking,
    success,
    failure,
  }[check];

  return (
    <span className="relative flex items-center gap-2">
      <div className={cn(preVariant({check}))} />
      <CheckIcon />
      <span>{text}</span>
    </span>
  );
}

function useLatticeCheck(): Check {
  const {isLoading, isConnected, client} = useLatticeClient();
  const [check, setCheck] = React.useState<Check>('checking');

  React.useEffect(() => {
    canConnect(client.instance.config.latticeUrl)
      .then((result) => {
        setCheck(result ? 'success' : 'failure');
      })
      .catch(() => {
        setCheck('failure');
      });
  }, [client.instance.config.latticeUrl]);

  return isLoading ? 'checking' : isConnected ? 'success' : check;
}

function useHostCheck(isEnabled: boolean): [Check, number] {
  const hostsQuery = useQuery({...listHostsQueryOptions(), enabled: isEnabled});

  if (!isEnabled) return ['pending', 0];
  if (hostsQuery.isLoading) return ['checking', 0];
  if (hostsQuery.isError) return ['failure', 0];
  if (hostsQuery.data?.length && hostsQuery.data.length > 0)
    return ['success', hostsQuery.data.length];
  return ['failure', 0];
}

function useApplicationCheck(isEnabled: boolean): [Check, number] {
  const appsQuery = useQuery({...listApplicationsQueryOptions(), enabled: isEnabled});

  if (!isEnabled) return ['pending', 0];
  if (appsQuery.isLoading) return ['checking', 0];
  if (appsQuery.isError) return ['failure', 0];
  if (appsQuery.data?.length && appsQuery.data.length > 0)
    return ['success', appsQuery.data.length];
  return ['failure', 0];
}

export {SetupHealthCheck};

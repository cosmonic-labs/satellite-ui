import {Button, PageHeader} from '@cosmonic/orbit-ui';
import {createFileRoute, Link, notFound} from '@tanstack/react-router';
import {ChevronLeftIcon, ExternalLinkIcon} from 'lucide-react';
import {Container} from '@/components/container';
import {SheetNotFound} from '@/components/sheet-not-found';
import {queryClient} from '@/context/query-client/query-client-instance';
import {getConfigQueryOptions} from '@/services/lattice-queries/configs/get-config';
import {rootLogger} from '@/services/logger/root-logger';

const routeLogger = rootLogger.getChildLogger('infrastructure.hosts.$hostId');

export const Route = createFileRoute('/(configs)/configs/_list/detail/$configName')({
  async loader({params}) {
    try {
      const config = await queryClient.ensureQueryData(getConfigQueryOptions(params.configName));

      if (!config) {
        throw notFound();
      }

      return config;
    } catch (error) {
      routeLogger.error(error);
      throw notFound();
    }
  },
  beforeLoad: ({params}) => ({
    breadcrumb: {
      label: 'Config Values',
      path: `/configs/${params.configName}`,
    },
  }),
  notFoundComponent() {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- its a hook, trust me
    const {configName} = Route.useParams();
    return (
      <Container>
        <PageHeader title="Config Not Found" />
        <SheetNotFound
          slots={{
            title: () => <>Whoops!</>,
            copy: () => (
              <>
                It doesn&rsquo;t seem like the config with name{' '}
                <code className="rounded border bg-muted">{configName}</code> exists. Maybe it was
                removed or you&rsquo;ve got an old URL saved?
              </>
            ),
            actions: () => (
              <>
                <Button asChild size="sm">
                  <a href="https://wasmcloud.com/docs/" target="_blank" rel="noopener">
                    View the Docs <ExternalLinkIcon size="16" className="ms-2" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link to="/configs">
                    <ChevronLeftIcon size="16" /> All Configs
                  </Link>
                </Button>
              </>
            ),
          }}
        />
      </Container>
    );
  },
});

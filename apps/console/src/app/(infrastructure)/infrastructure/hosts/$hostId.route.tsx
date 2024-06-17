import {PageHeader} from '@cosmonic/orbit-ui';
import {createFileRoute, notFound} from '@tanstack/react-router';
import {HostNotFound} from '@/app/(infrastructure)/-components/host-not-found';
import {Container} from '@/components/container';
import {queryClient} from '@/context/query-client/query-client-instance';
import {getHostQueryOptions} from '@/services/lattice-queries/hosts/get-host';
import {rootLogger} from '@/services/logger/root-logger';

const routeLogger = rootLogger.getChildLogger('infrastructure.hosts.$hostId');

export const Route = createFileRoute('/(infrastructure)/infrastructure/hosts/$hostId')({
  async loader({params}) {
    try {
      const host = await queryClient.ensureQueryData(
        getHostQueryOptions(params.hostId.toUpperCase()),
      );

      if (!host) {
        throw notFound();
      }

      return host;
    } catch (error) {
      routeLogger.error(error);
      throw notFound();
    }
  },
  beforeLoad: ({params}) => ({
    breadcrumb: {
      label: 'Host Detail',
      path: `/infrastructure/hosts/${params.hostId}`,
    },
  }),
  notFoundComponent() {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- its a hook, trust me
    const {hostId} = Route.useParams();
    return (
      <Container>
        <PageHeader title="Host Not Found" />
        <HostNotFound id={hostId} />
      </Container>
    );
  },
});

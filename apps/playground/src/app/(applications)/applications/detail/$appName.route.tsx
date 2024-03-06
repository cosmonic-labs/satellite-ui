import {createFileRoute, notFound} from '@tanstack/react-router';
import {AppNotFound} from '@/app/(applications)/-components/app-not-found';
import {queryClient} from '@/context/query-client/query-client-instance';
import {applicationDetailQueryOptions} from '@/services/lattice-queries/applications/get-application-detail';
import {listConfigNamesQueryOptions} from '@/services/lattice-queries/configs/list-configs';
import {listHostDetailsQueryOptions} from '@/services/lattice-queries/hosts/list-hosts';
import {listLinksQueryOptions} from '@/services/lattice-queries/links/list-links';

type AppDetailSearchOptions = {view?: 'manifest' | 'versions'};

export const Route = createFileRoute('/(applications)/applications/detail/$appName')({
  async loader({params: {appName}}) {
    try {
      const application = await queryClient.ensureQueryData(applicationDetailQueryOptions(appName));
      const configNames = await queryClient.ensureQueryData(listConfigNamesQueryOptions());
      const links = await queryClient.ensureQueryData(listLinksQueryOptions());
      const hosts = await queryClient.ensureQueryData(listHostDetailsQueryOptions());
      if (!application || !configNames || !links || !hosts) throw notFound();
    } catch {
      throw notFound();
    }
  },
  validateSearch(search: Record<string, unknown>): AppDetailSearchOptions {
    if (search.view === 'versions') {
      return search;
    }

    return {view: 'manifest'};
  },
  notFoundComponent() {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook
    const {appName} = Route.useParams();
    return <AppNotFound name={appName} />;
  },
});

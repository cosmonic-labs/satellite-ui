import {
  SectionTabs,
  SectionTabsContent,
  SectionTabsList,
  SectionTabsTrigger,
} from '@cosmonic/orbit-ui';
import {useSuspenseQueries} from '@tanstack/react-query';
import {useNavigate, useParams, useSearch, createLazyFileRoute} from '@tanstack/react-router';
import * as React from 'react';
import {ApplicationManifest} from '@/app/(applications)/-components/application-manifest';
import {ApplicationVersions} from '@/app/(applications)/-components/application-versions';
import {applicationDetailQueryOptions} from '@/services/lattice-queries/applications/get-application-detail';
import {listConfigNamesQueryOptions} from '@/services/lattice-queries/configs/list-configs';
import {listHostDetailsQueryOptions} from '@/services/lattice-queries/hosts/list-hosts';
import {listLinksQueryOptions} from '@/services/lattice-queries/links/list-links';

export const Route = createLazyFileRoute('/(applications)/applications/detail/$appName')({
  component: () => <ApplicationDetail />,
});

function ApplicationDetail(): React.ReactElement {
  const {view} = useSearch({from: '/(applications)/applications/detail/$appName'});
  const {appName} = useParams({from: '/(applications)/applications/detail/$appName'});
  const [{data: application}, {data: configNames}, {data: hosts}, {data: links}] =
    useSuspenseQueries({
      queries: [
        applicationDetailQueryOptions(appName),
        listConfigNamesQueryOptions(),
        listHostDetailsQueryOptions(),
        listLinksQueryOptions(),
      ],
    });
  const navigate = useNavigate({from: '/applications/detail/$appName'});
  const handleTabChange = React.useCallback(
    (value: string) => {
      navigate({search: {view: value as 'manifest' | 'versions' | undefined}, replace: true});
    },
    [navigate],
  );

  return (
    <SectionTabs value={view} onValueChange={handleTabChange}>
      <SectionTabsList>
        <div className="container mx-auto">
          <SectionTabsTrigger value="manifest">Manifest</SectionTabsTrigger>
          <SectionTabsTrigger value="versions">Versions</SectionTabsTrigger>
        </div>
      </SectionTabsList>
      <div className="container mx-auto">
        <SectionTabsContent value="manifest">
          <ApplicationManifest
            application={application}
            configNames={configNames}
            hosts={hosts}
            links={links}
          />
        </SectionTabsContent>
        <SectionTabsContent value="versions">
          <ApplicationVersions application={application} />
        </SectionTabsContent>
      </div>
    </SectionTabs>
  );
}

export {ApplicationDetail};

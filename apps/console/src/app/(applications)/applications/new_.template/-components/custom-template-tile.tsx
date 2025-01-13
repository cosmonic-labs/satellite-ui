import {useQuery} from '@tanstack/react-query';
import * as React from 'react';
import {extractApplicationData} from '@/app/(applications)/-helpers/extract-application-data';
import {type ApplicationTemplate} from '@/app/(applications)/applications/new_.template/-services/app-templates';
import {TemplateTile} from './template-tile';

type CustomTemplateTileProps = {
  readonly manifestUrl: string;
  readonly value?: ApplicationTemplate;
  readonly onClick?: (selected: ApplicationTemplate) => void;
};

function CustomTemplateTile({
  manifestUrl,
  value,
  onClick,
}: CustomTemplateTileProps): React.ReactElement {
  const query = useQuery({
    queryKey: ['app-template', 'yaml', manifestUrl],
    async queryFn() {
      const response = await fetch(manifestUrl);
      return response.text();
    },
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });

  const app: ApplicationTemplate = React.useMemo(() => {
    if (!query.data)
      return {
        name: 'Loading...',
        description: '',
        manifest: manifestUrl,
        source: manifestUrl,
      };
    const appData = extractApplicationData(query.data);
    const app = {
      name: `${appData.name ?? ''}${appData.version ? `@${appData.version}` : ''}`,
      manifest: manifestUrl,
      source: manifestUrl,
      description: (
        <div>
          {appData.description}
          <div className="mt-2 text-xs italic text-muted-foreground">
            Loaded from{' '}
            <a href={manifestUrl} className="underline" target="_blank" rel="noreferrer">
              <code className="text-[0.9em]">{manifestUrl}</code>
            </a>
          </div>
        </div>
      ),
    };
    onClick?.(app);
    return app;
  }, [manifestUrl, onClick, query.data]);

  return <TemplateTile isSelected={value?.manifest === manifestUrl} app={app} onClick={onClick} />;
}

export {CustomTemplateTile};

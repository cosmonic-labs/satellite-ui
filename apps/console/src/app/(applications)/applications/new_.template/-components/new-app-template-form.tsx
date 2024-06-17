import {GlossaryLink, Button, cn} from '@cosmonic/orbit-ui';
import {useQuery} from '@tanstack/react-query';
import {useSearch, Link} from '@tanstack/react-router';
import {Loader2Icon} from 'lucide-react';
import * as React from 'react';
import {extractApplicationData} from '@/app/(applications)/-helpers/extract-application-data';
import {applicationDetailQueryOptions} from '@/services/lattice-queries/applications/get-application-detail';
import {usePutApplicationMutation} from '@/services/lattice-queries/applications/put-application';
import {rootLogger} from '@/services/logger/root-logger';
import {APP_TEMPLATES, type ApplicationTemplate} from '../-services/app-templates';
import {CustomTemplateTile} from './custom-template-tile';
import {InputAppTiles} from './input-app-tiles';

const YamlEditor = React.lazy(async () =>
  import('@/components/yaml-editor').then((module_) => ({default: module_.YamlEditor})),
);

enum Stage {
  INITIAL = 0,
  REVIEW = 1,
  DEPLOYING = 2,
  DEPLOYED = 3,
}

type NewAppFromTemplateState = {
  selected?: ApplicationTemplate;
  stage: Stage;
};

const initialState: NewAppFromTemplateState = {
  stage: Stage.INITIAL,
};

type NewAppFromTemplateAction =
  | {
      type: 'SELECTED';
      payload: {
        selected: ApplicationTemplate;
      };
    }
  | {
      type: 'DEPLOY';
    }
  | {
      type: 'DEPLOYED';
    }
  | {
      type: 'RESET';
    };

function reducer(state: NewAppFromTemplateState, action: NewAppFromTemplateAction): typeof state {
  switch (action.type) {
    case 'SELECTED': {
      return {
        ...state,
        stage: Stage.REVIEW,
        selected: action.payload.selected,
      };
    }

    case 'DEPLOY': {
      return {
        ...state,
        stage: Stage.DEPLOYING,
      };
    }

    case 'DEPLOYED': {
      return {
        ...state,
        stage: Stage.DEPLOYED,
      };
    }

    case 'RESET': {
      return initialState;
    }
  }
}

function NewAppTemplateForm(): React.ReactElement {
  const [{selected, stage}, dispatch] = React.useReducer(reducer, initialState);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const reviewElementRef = React.useRef<HTMLDivElement>(null);
  const deployedElementRef = React.useRef<HTMLDivElement>(null);

  const search = useSearch({from: '/applications/new/template'});
  const manifestUrlFromParameter = search.manifest;
  const isManifestIncluded = APP_TEMPLATES.some((app) => app.manifest === manifestUrlFromParameter);
  const shouldDisplayCustomTile = manifestUrlFromParameter && !isManifestIncluded;

  const handleSelect = React.useCallback((selected: ApplicationTemplate) => {
    dispatch({type: 'SELECTED', payload: {selected}});
    setTimeout(() => {
      reviewElementRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 10);
  }, []);

  const handleDeployed = React.useCallback(() => {
    dispatch({type: 'DEPLOYED'});
    setTimeout(() => {
      deployedElementRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 10);
  }, []);

  const deployMutation = usePutApplicationMutation({
    onSuccess() {
      handleDeployed();
    },
    onError(error) {
      rootLogger.error('template', 'Failed to deploy application', error as Error);
    },
  });

  const templateQuery = useQuery({
    enabled: Boolean(selected),
    queryKey: ['app-template', 'yaml', selected?.manifest],
    async queryFn() {
      if (!selected?.manifest) {
        throw new Error('No manifest selected');
      }

      const response = await fetch(selected?.manifest);
      return response.text();
    },
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });

  const appName = templateQuery.data ? extractApplicationData(templateQuery.data)?.name ?? '' : '';

  const appQuery = useQuery(applicationDetailQueryOptions(appName));

  const handleDeploy = React.useCallback(() => {
    dispatch({type: 'DEPLOY'});
    if (selected && templateQuery.data) {
      deployMutation.mutate({
        yaml: templateQuery.data,
        autoDeploy: true,
      });
    }
  }, [templateQuery.data, deployMutation, selected]);

  React.useEffect(() => {
    if (shouldDisplayCustomTile) {
      dispatch({
        type: 'SELECTED',
        payload: {
          selected: {
            name: 'Custom Template',
            description: 'A custom template loaded from a URL',
            manifest: manifestUrlFromParameter,
            source: manifestUrlFromParameter,
          },
        },
      });
    }
  }, [manifestUrlFromParameter, shouldDisplayCustomTile]);

  return (
    <>
      {stage >= Stage.INITIAL && (
        <div>
          {shouldDisplayCustomTile ? (
            <div className="mx-auto mb-4 md:w-2/3">
              <CustomTemplateTile
                manifestUrl={manifestUrlFromParameter}
                value={selected}
                onClick={handleSelect}
              />
            </div>
          ) : (
            <InputAppTiles value={selected} onChange={handleSelect} />
          )}
          <div className="my-4 flex items-center justify-center text-sm">
            <div className="mt-4">
              Or{' '}
              <Link to="/applications/new" className="text-primary">
                create a new application from scratch
              </Link>
            </div>
          </div>
        </div>
      )}
      {stage >= Stage.REVIEW && (
        <div ref={reviewElementRef} className="mt-10 rounded-md border bg-background p-4">
          <h2 className="mb-2 text-xl font-medium text-primary">{selected?.name}</h2>
          <p className="mb-2 text-sm">
            This is the <GlossaryLink term="wadm">WADM</GlossaryLink> manifest which declaratively
            describes the components of the {selected?.name} application. This will deploy the
            application in your <GlossaryLink term="Constellation">constellation</GlossaryLink>.
          </p>
          <div className={cn('relative mb-4 border', {'h-96': isExpanded})}>
            <React.Suspense fallback={<div />}>
              <YamlEditor
                disabled
                value={templateQuery.isLoading ? '# Loading manifest...' : templateQuery.data}
              />
            </React.Suspense>
            {!isExpanded && (
              <div
                className={cn(
                  'pointer-events-none absolute inset-x-0 bottom-0 flex h-24 w-full items-end justify-center p-2',
                  'bg-gradient-to-b from-transparent via-background/70 to-background',
                )}
              >
                <button
                  type="button"
                  className="pointer-events-auto text-xs font-medium uppercase text-primary transition-colors hover:text-foreground"
                  onClick={() => {
                    setIsExpanded(true);
                  }}
                >
                  Expand
                </button>
              </div>
            )}
          </div>
          {stage < Stage.DEPLOYED && (
            <div className="flex items-center gap-4">
              {appQuery.error ? (
                <>
                  <Button type="button" onClick={handleDeploy}>
                    {deployMutation.isPending && (
                      <Loader2Icon className="ml-2 size-4 animate-spin" />
                    )}
                    Deploy Application
                  </Button>
                  {deployMutation.isError && (
                    <div className="text-sm text-destructive">
                      {(deployMutation.error as Error)?.message}
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <div className="mb-2 text-sm text-muted-foreground">
                    An application with this name already exists! Is this app already deployed?
                  </div>
                  <Button asChild type="button">
                    <Link to={`../detail/${appName}`}>View Application Details</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {stage === Stage.DEPLOYED && (
        <div ref={deployedElementRef} className="mb-48 mt-10">
          <h2 className="mb-4 text-2xl font-semibold text-primary">Application Deployed!</h2>
          <div className="mb-4 text-sm">
            Your application is now distributing across your constellation. You can view the status
            of your application on the Detail Page
          </div>
          <div>
            <Button asChild>
              <Link to={`../detail/${appName}`}>Detail Page</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export {NewAppTemplateForm};

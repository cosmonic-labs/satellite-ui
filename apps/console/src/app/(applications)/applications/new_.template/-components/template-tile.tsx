import {Badge, Button, cn} from '@cosmonic/orbit-ui';
import {CheckCircleIcon, Code2Icon, StarIcon} from 'lucide-react';
import * as React from 'react';
import {type ApplicationTemplate} from '../-services/app-templates';

type TemplateTileProps = {
  readonly isSelected?: boolean;
  readonly app: ApplicationTemplate;
  readonly onClick?: (app: ApplicationTemplate) => void;
};

function TemplateTile({app, isSelected, onClick}: TemplateTileProps): React.ReactElement {
  const handleClick = React.useCallback(() => {
    if (onClick) onClick(app);
  }, [onClick, app]);

  return (
    <div
      className={cn(
        'group relative flex cursor-auto flex-col overflow-hidden rounded-md border bg-background p-3 text-left shadow-md transition-all duration-150',
        'hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isSelected && 'border-primary shadow-lg shadow-primary/30',
      )}
    >
      <h3 className="-mt-1 mb-4 flex items-start text-lg font-medium text-cosmo-blue">
        <span>{app.name}</span>
        {app.recommended && (
          <span className="ml-auto flex items-center text-xs text-primary">
            <StarIcon className="mr-1 size-3" /> Recommended
          </span>
        )}
      </h3>
      {app.capabilities && app.capabilities.length > 0 && (
        <div className="-mt-2 mb-3 flex flex-wrap gap-1">
          {app.capabilities?.map((cap) => (
            <Badge key={cap} variant="outline" className="bg-muted text-muted-foreground">
              {cap}
            </Badge>
          ))}
        </div>
      )}
      <div className="grow text-sm">{app.description}</div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-primary">
        <Button
          size="xs"
          className="flex items-center after:pointer-events-auto after:absolute after:inset-0 after:z-10 after:bg-transparent"
          onClick={handleClick}
        >
          <CheckCircleIcon className="mr-1 size-3.5" />
          Use this template
        </Button>
        <Button asChild size="xs" variant="secondary">
          <a href={app.source} target="_blank" rel="noreferrer" className="z-20 flex items-center">
            <Code2Icon className="mr-1 size-3.5" />
            View Source
          </a>
        </Button>
      </div>
    </div>
  );
}

export {TemplateTile};

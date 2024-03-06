import {Badge} from '@cosmonic/orbit-ui';
import * as React from 'react';

type SummaryTileProps = {
  readonly title: string;
  readonly count: string | number;
};

function SummaryTile({title, count}: SummaryTileProps): React.ReactElement {
  return (
    <div className="flex items-center justify-between rounded-md border-border bg-card px-4 py-2 font-medium text-card-foreground/70 shadow-sm">
      <div>{title}</div>
      <Badge variant="secondary">{count}</Badge>
    </div>
  );
}

export {SummaryTile};

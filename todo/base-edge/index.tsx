import {type ArgumentsType} from 'node:util/type-helpers';
import {cva} from 'class-variance-authority';
import * as React from 'react';
import {type EdgeProps, getBezierPath} from 'reactflow';
import {cn} from '@/util/cn.js';

const baseEdgeStyle = cva('fill-none stroke-current stroke-2 text-gray-400 dark:text-gray-600', {
  variants: {
    selected: {
      true: 'stroke-2 text-cosmo-blue dark:text-cosmo-blue-600',
    },
    faded: {
      true: 'opacity-30',
    },
  },
});

type BaseEdgeProperties = EdgeProps & {
  faded?: boolean;
};

function BaseEdge({
  selected,
  faded,
  interactionWidth = 8,
  ...properties
}: BaseEdgeProperties): React.ReactElement {
  const edgePathParameters = getEdgePathParameters(properties);
  const [path] = getBezierPath(edgePathParameters);

  return (
    <>
      <path className={cn(baseEdgeStyle({selected, faded}))} d={path} {...properties} />
      {interactionWidth && (
        <path d={path} fill="none" strokeOpacity={0} strokeWidth={interactionWidth} />
      )}
    </>
  );
}

function getEdgePathParameters(properties: EdgeProps): ArgumentsType<typeof getBezierPath>[0] {
  return {
    sourceX: properties.sourceX,
    sourceY: properties.sourceY,
    sourcePosition: properties.sourcePosition,
    targetX: properties.targetX,
    targetY: properties.targetY,
    targetPosition: properties.targetPosition,
  };
}

export {BaseEdge};

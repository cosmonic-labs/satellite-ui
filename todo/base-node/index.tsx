import type {NodeLifecycle} from 'features/logic/core/types/logic-nodes';
import {cva} from 'class-variance-authority';
import {type HTMLAttributes, type DetailedHTMLProps, type PropsWithChildren} from 'react';
import {cn} from '@/util/cn.js';

type BaseNodeProperties = {
  selected?: boolean;
  type?: 'actor' | 'provider' | 'wormhole' | 'handle' | 'linkdef';
  status?: string;
  scaled?: boolean;
  faded?: boolean;
  lifecycle?: NodeLifecycle;
  bgClassName?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

// There's a lot of CSS here and a bunch of variation for only two divs, and I've already forgotten
// how this works, so this comment is for when I inevitably forget again.
//
// This is a component that is used to render the node with a border, a background, and an extra
// "scaled" border.
// - The border is a solid color which is defined by the 'text-{color}' class. It includes a ::before
//   pseudo-element which is used to create a dashed border for pending nodes. The ::after pseudo-
//   element is used to create the "scaled" border.
// - The background is a solid color which is defined by the 'bg-{color}' class. This is so that the
//   whole element can be made transparent and blurred.

const borderStyle = cva(
  'relative box-content h-full w-[300px] bg-current p-0.5 transition-all duration-100 before:hidden before:border-current before:transition-all before:duration-100 after:border-current after:transition-all after:duration-100',
  {
    variants: {
      selected: {
        true: '-m-0.5 p-1 [box-shadow:0_20px_20px_2px_rgba(0_0_0/20%)]',
      },
      scaled: {
        true: 'after:absolute after:-bottom-1 after:-right-1 after:-z-10 after:h-5/6 after:w-5/6 after:border-b-2 after:border-r-2',
      },
      type: {
        actor: 'rounded-xl text-cosmo-purple after:rounded-br-3xl dark:text-cosmo-purple-700',
        provider: 'text-cosmo-blue-400 dark:text-cosmo-blue-700',
        wormhole: 'w-auto rounded-full bg-gradient-to-r from-cosmo-grey to-cosmo-blue p-px',
        handle: 'rounded-md text-cosmo-grey-200 dark:text-cosmo-grey-800',
        linkdef: 'p-px rounded-md text-foreground/50 dark:text-foreground/20',
      },
      lifecycle: {
        PENDING:
          'bg-primary-foreground/50 backdrop-blur-md before:block before:absolute before:inset-0 before:h-full before:w-full before:rounded-[inherit] before:border-2 before:border-dashed',
        ACCEPTED: 'animate-pulse-node bg-primary backdrop-blur-md [animation-duration:1.5s]',
        CREATED: '',
      },
      faded: {
        true: 'opacity-40',
      },
    },
    compoundVariants: [
      {
        selected: true,
        type: 'wormhole',
        class: '-m-px p-0.5',
      },
      {
        selected: true,
        type: 'actor',
        class: 'rounded-2xl',
      },
      {
        selected: true,
        type: 'linkdef',
        class: '[box-shadow:0_0_5px_rgb(0_0_0/.5)] p-0.5 -m-px rounded-[7px]',
      },
      {
        selected: true,
        lifecycle: 'PENDING',
        class: 'before:border-4',
      },
    ],
  },
);

const bgStyle = cva('relative bg-card text-foreground dark:bg-cosmo-grey-900', {
  variants: {
    type: {
      actor: 'rounded-lg',
      provider: '',
      wormhole: 'rounded-full',
      handle: 'rounded',
      linkdef: 'rounded-[5px] py-2 pl-3 pr-2',
    },
    lifecycle: {
      PENDING: '',
      ACCEPTED: 'bg-cosmo-grey-300 dark:bg-cosmo-grey-700',
      CREATED: '',
    },
  },
});

function BaseNode({
  children,
  selected,
  scaled,
  type,
  faded,
  lifecycle,
  className,
  bgClassName,
  ...properties
}: PropsWithChildren<BaseNodeProperties>): JSX.Element {
  return (
    <div
      className={cn(
        borderStyle({
          selected,
          type,
          scaled,
          lifecycle,
          faded,
        }),
        className,
      )}
      {...properties}
    >
      <div className={cn(bgStyle({type, lifecycle}), bgClassName)}>{children}</div>
    </div>
  );
}

export {BaseNode};

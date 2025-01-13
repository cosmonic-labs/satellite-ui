import {cn} from '@cosmonic/orbit-ui';
import {cva, type VariantProps} from 'class-variance-authority';
import React, {type PropsWithChildren} from 'react';

type ContainerProps = VariantProps<typeof containerStyles> &
  VariantProps<typeof innerStyles> & {
    /** additional class names to pass to container */
    readonly className?: string;
  };

const containerStyles = cva('relative overflow-auto', {
  variants: {
    h: {
      full: 'h-full',
      auto: 'h-auto',
    },
  },
});

const innerStyles = cva('', {
  variants: {
    my: {
      '0': '',
      'sm': 'my-4',
      'md': 'my-12',
    },
    mx: {
      '0': '',
      'sm': 'container mx-auto max-w-screen-xl px-2 sm:px-4',
      'md': 'container mx-auto max-w-screen-xl px-2 sm:px-4',
    },
  },
});

/**
 * Used to keep page content within a certain width and to add vertical spacing
 */
function Container({
  mx = 'sm',
  my = 'sm',
  h = 'auto',
  className,
  children,
}: PropsWithChildren<ContainerProps>): React.ReactElement {
  return (
    <div className={cn(containerStyles({h}), className)}>
      <div className={cn(innerStyles({mx, my}))}>{children}</div>
    </div>
  );
}

export {Container};

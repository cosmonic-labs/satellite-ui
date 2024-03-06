import {cva} from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow',
        outline: 'text-foreground',
      },
      isMini: {
        true: 'px-1.5 py-0 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      isMini: false,
    },
  },
);

export {badgeVariants};

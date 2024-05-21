import {cn, useForwardedRef} from '@cosmonic/orbit-ui';
import {cva} from 'class-variance-authority';
import * as React from 'react';
import {SetupStep} from './setup-step';

type SetupScrollerProps = React.HTMLProps<HTMLDivElement>;

function isSetupStepComponent(
  child: React.ReactNode,
): child is React.ReactElement<React.ComponentProps<typeof SetupStep>> {
  return React.isValidElement(child) && child.type === SetupStep;
}

const SetupScroller = React.forwardRef<HTMLDivElement, SetupScrollerProps>(
  ({children, className, ...props}, ref) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const outerRef = useForwardedRef(ref);
    const childrenWithRefs = React.Children.toArray(children)
      .filter((child) => isSetupStepComponent(child))
      .map((child, index) => React.cloneElement(child, {key: index, index, activeIndex}));
    const steps: StepData[] = childrenWithRefs.map((child, index) => ({
      index,
      title: child.props.title ?? '',
    }));

    const shouldShowScroller = steps.length > 1;

    return (
      <div
        ref={outerRef}
        className={cn('relative -mx-6 w-[calc(100%+3rem)] overflow-hidden', className)}
        {...props}
      >
        <div ref={contentRef}>
          <div className="relative">{childrenWithRefs}</div>
          <div className="mt-4 flex gap-2">
            {shouldShowScroller && (
              <StepsIndicator
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                steps={steps}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);
SetupScroller.displayName = 'SetupScroller';

export {SetupScroller};

type StepData = {
  index: number;
  title: string;
};
type StepsIndicatorProps = React.PropsWithChildren<
  {
    readonly activeIndex: number;
    readonly setActiveIndex: (index: number) => void;
    readonly steps: StepData[];
  } & React.HTMLProps<HTMLDivElement>
>;

const stepVariants = cva(
  'relative size-2 rounded-full transition-all before:absolute before:left-0 before:top-0 before:-m-1 before:block before:size-[calc(100%+0.5rem)]',
  {
    variants: {
      isActive: {
        true: 'w-8 bg-primary',
        false: 'w-2 bg-muted-foreground/50',
      },
    },
  },
);

const StepsIndicator = React.forwardRef<HTMLDivElement, StepsIndicatorProps>(
  ({activeIndex, setActiveIndex, steps = []}, ref) => (
    <div ref={ref} className="mx-6 flex gap-2">
      {steps.map((step) => (
        <button
          key={step.index}
          type="button"
          className={stepVariants({isActive: activeIndex === step.index})}
          data-active={activeIndex === step.index}
          aria-selected={activeIndex === step.index}
          aria-label={step.title}
          onClick={() => {
            setActiveIndex(step.index);
          }}
        >
          <span className="sr-only">{step.title}</span>
        </button>
      ))}
    </div>
  ),
);

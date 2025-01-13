import {Button, type ButtonProps, cn, useForwardedRef} from '@cosmonic/orbit-ui';
import {cva} from 'class-variance-authority';
import * as React from 'react';
import {SetupStep} from './setup-step';

type SetupScrollerProps = React.HTMLProps<HTMLDivElement>;

type SetupScrollerContextValue = {
  readonly activeIndex: number;
  readonly setActiveIndex: (index: number) => void;
  readonly steps: StepData[];
};

const setupScrollerContext = React.createContext<SetupScrollerContextValue | undefined>(undefined);

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
      .filter((child) => {
        const isMatch = isSetupStepComponent(child);
        if (!isMatch) {
          const type = React.isValidElement(child) ? child.type.toString() : typeof child;
          console.error(
            `SetupScroller only accepts SetupStep children. You passed a ${type}. This component will not be rendered.`,
          );
        }

        return isMatch;
      })
      .map((child, index) => React.cloneElement(child, {key: index, index, activeIndex}));
    const steps: StepData[] = childrenWithRefs.map((child, index) => ({
      index,
      title: child.props.title ?? '',
    }));
    const contextValue = React.useMemo(
      () => ({activeIndex, setActiveIndex, steps}),
      [activeIndex, steps],
    );

    const shouldShowScroller = steps.length > 1;

    return (
      <setupScrollerContext.Provider value={contextValue}>
        <div
          ref={outerRef}
          className={cn('relative -mx-6 w-[calc(100%+3rem)]', className)}
          {...props}
        >
          <div ref={contentRef}>
            <div className="relative">{childrenWithRefs}</div>
            {shouldShowScroller && (
              <div className="mt-6 flex gap-2">
                <StepsIndicator />
              </div>
            )}
          </div>
        </div>
      </setupScrollerContext.Provider>
    );
  },
);
SetupScroller.displayName = 'SetupScroller';

type StepData = {
  index: number;
  title: string;
};

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

const StepsIndicator = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    const stepContext = React.useContext(setupScrollerContext);
    if (!stepContext) {
      throw new Error('StepsIndicator must be rendered within a SetupScroller component.');
    }

    const {activeIndex, steps, setActiveIndex} = stepContext;

    return (
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
    );
  },
);

StepsIndicator.displayName = 'StepsIndicator';

type SetupScrollerButtonProps = ButtonProps &
  (
    | ({isNext?: boolean; isPrevious?: boolean} & {isNext: true; isPrevious?: false})
    | {isNext?: false; isPrevious: true}
  );

const SetupScrollerButton = React.forwardRef<HTMLButtonElement, SetupScrollerButtonProps>(
  ({children, isPrevious, className: _1, isNext: _2, ...props}, ref) => {
    const stepContext = React.useContext(setupScrollerContext);
    if (!stepContext) {
      throw new Error('SetupScrollerButton must be rendered within a SetupScroller component.');
    }

    const {activeIndex, setActiveIndex} = stepContext;

    const clickHandler = React.useCallback(() => {
      const newIndex = activeIndex + (isPrevious ? -1 : 1);
      setActiveIndex(newIndex);
    }, [activeIndex, setActiveIndex, isPrevious]);

    return (
      <Button ref={ref} onClick={clickHandler} {...props}>
        {children}
      </Button>
    );
  },
);

SetupScrollerButton.displayName = 'SetupScrollerButton';

export {SetupScroller, StepsIndicator, SetupScrollerButton};

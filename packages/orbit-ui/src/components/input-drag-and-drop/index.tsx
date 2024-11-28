import {Presence} from '@radix-ui/react-presence';
import {Primitive} from '@radix-ui/react-primitive';
import {type VariantProps, cva} from 'class-variance-authority';
import * as React from 'react';
import {cn} from '@/util/cn.js';

const outerStyles = cva('bg-white/20 backdrop-blur', {
  variants: {
    dragging: {
      true: 'animate-in fade-in',
      false: 'animate-out fade-out',
    },
    hovered: {
      true: 'bg-primary/20',
    },
  },
});

const innerStyles = cva('flex items-center justify-center border-4 border-dashed border-primary', {
  variants: {
    size: {
      small: 'm-2 size-[calc(100%_-_1rem)] rounded-xl text-sm',
      medium: 'm-4 size-[calc(100%_-_2rem)] rounded-2xl text-base',
      large: 'm-6 size-[calc(100%_-_3rem)] rounded-3xl text-xl',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

type DragAndDropInputProperties = VariantProps<typeof innerStyles> &
  React.HTMLAttributes<HTMLDivElement> & {
    readonly onDropInput?: (contents: string) => void;
  };

type DragAndDropInputState = {
  dragging: boolean;
  hovered: boolean;
  dragLevel: number;
} & Record<string, unknown>;

type DragAndDropInputAction =
  | {
      type: 'SET_HOVERED';
      payload: boolean;
    }
  | {
      type: 'SET_DRAGGING';
      payload: boolean;
    }
  | {
      type: 'RESET';
    };

const initialState: DragAndDropInputState = {dragging: false, hovered: false, dragLevel: 0};
const reducer = (
  state: DragAndDropInputState,
  action: DragAndDropInputAction,
): DragAndDropInputState => {
  switch (action.type) {
    case 'SET_HOVERED': {
      return {...state, hovered: action.payload};
    }

    case 'SET_DRAGGING': {
      return {...state, dragging: action.payload};
    }

    case 'RESET': {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

const DragAndDropInput = React.forwardRef<HTMLDivElement, DragAndDropInputProperties>(
  ({className, onDropInput, children, size, ...properties}, reference) => {
    const [{dragging, hovered}, dispatch] = React.useReducer(reducer, initialState);

    // Handle events
    const handleDrop: React.DragEventHandler<HTMLDivElement> = React.useCallback(
      (event) => {
        // Reset state
        event.preventDefault();
        event.stopPropagation();
        dispatch({type: 'RESET'});

        // Check for file, load contents and call onInput
        const file = event.dataTransfer.files.item(0);
        if (!file) {
          return;
        }

        file.text().then((text) => {
          onDropInput?.(text);
        });
      },
      [onDropInput],
    );
    const handleDragEnter: React.DragEventHandler<HTMLDivElement> = React.useCallback(
      (event): void => {
        event.preventDefault();
        dispatch({type: 'SET_HOVERED', payload: true});
      },
      [],
    );
    const handleDragLeave: React.DragEventHandler<HTMLDivElement> = React.useCallback(
      (event): void => {
        event.preventDefault();
        dispatch({type: 'SET_HOVERED', payload: false});
      },
      [],
    );

    // Handle window drag events
    const windowDragEnter = React.useCallback((event: DragEvent): void => {
      event.preventDefault();
      dispatch({type: 'SET_DRAGGING', payload: true});
    }, []);
    const windowDragLeave = React.useCallback((event: DragEvent): void => {
      event.preventDefault();
      dispatch({type: 'SET_DRAGGING', payload: false});
    }, []);
    React.useEffect(() => {
      document.addEventListener('dragenter', windowDragEnter);
      document.addEventListener('dragleave', windowDragLeave);
      return () => {
        document.removeEventListener('dragenter', windowDragEnter);
        document.removeEventListener('dragleave', windowDragLeave);
      };
    }, [windowDragEnter, windowDragLeave]);

    return (
      <Presence present={dragging || hovered}>
        <Primitive.div
          ref={reference}
          className={cn(outerStyles({hovered, dragging}), className)}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          {...properties}
        >
          <div className={innerStyles({size})}>{children}</div>
        </Primitive.div>
      </Presence>
    );
  },
);
DragAndDropInput.displayName = 'DragAndDropInput';

export {DragAndDropInput};

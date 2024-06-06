import {XCircleIcon} from 'lucide-react';
import * as React from 'react';
import {useForwardedRef} from '@/hooks/use-forwarded-ref.js';
import {cn} from '@/util/cn.js';

type InputChipsReducerAction =
  | {
      payload: string;
      type: 'add' | 'remove';
    }
  | {
      payload: string[];
      type: 'multiple' | 'replace';
    };

function inputReducer(state: string[], action: InputChipsReducerAction): string[] {
  const {type, payload} = action;
  switch (type) {
    case 'add': {
      const kvPair = payload;
      // If the key already exists, shift the new value to the end of the list
      const existing = state.indexOf(action.payload);
      if (existing !== -1) {
        return [...state.slice(0, existing), ...state.slice(existing + 1), kvPair];
      }

      return [...state, kvPair];
    }

    case 'remove': {
      return state.filter((item) => item !== action.payload);
    }

    case 'multiple': {
      return [...state, ...action.payload];
    }

    case 'replace': {
      return action.payload;
    }
  }
}

type InputChipsLabelProps = {
  readonly value: string;
  readonly onDelete?: (value: string) => void;
  readonly onEdit?: (value: string) => void;
};

const InputChipsLabel = React.forwardRef<HTMLSpanElement, InputChipsLabelProps>(
  ({value, onEdit, onDelete}, ref): React.ReactElement => {
    const handleDoubleClick = React.useCallback(() => onEdit?.(value), [value, onEdit]);
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (['Backspace', 'Delete'].includes(event.key)) {
          event.preventDefault();
          onDelete?.(value);
        }

        if (['Enter'].includes(event.key)) {
          event.preventDefault();
          onEdit?.(value);
        }
      },
      [value, onDelete, onEdit],
    );

    return (
      <InputChipsChip
        ref={ref}
        tabIndex={0}
        onClick={(event) => {
          event.currentTarget.focus();
        }}
        onKeyDown={handleKeyDown}
        onDoubleClick={handleDoubleClick}
      >
        {value}
        <XCircleIcon
          className="ms-0.5 size-3 text-destructive"
          strokeWidth={1.5}
          onClick={() => onDelete?.(value)}
        />
      </InputChipsChip>
    );
  },
);
InputChipsLabel.displayName = 'InputChipsLabel';

type InputChipsProps = {
  readonly onChange?: (values: string[]) => void;
  readonly value?: string[];
  readonly onBlur?: () => void;
  readonly name?: string;
  readonly placeholder?: string;
};

const InputChips = React.forwardRef<HTMLDivElement, InputChipsProps>(
  ({onChange, onBlur, placeholder, name, value}, reference): React.ReactElement => {
    const labelReference = React.useRef<Array<HTMLSpanElement | undefined>>([]);
    const [values, setValues] = React.useReducer(inputReducer, value ?? []);
    const editableReference = useForwardedRef(reference);
    const [input, setInput] = React.useState('');

    const addValue = React.useCallback(
      (input: string) => {
        setValues({type: 'add', payload: input});
        setInput('');
        if (!editableReference.current) {
          return;
        }

        editableReference.current.textContent = '';
      },
      [editableReference],
    );

    const handleInput = React.useCallback((event: React.FormEvent<HTMLDivElement>) => {
      setInput(event.currentTarget.textContent ?? '');
    }, []);

    const handleInputBlur = React.useCallback(() => {
      if (input) addValue(input);
      onBlur?.();
    }, [addValue, input, onBlur]);

    const handleInputKeydown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (['Space', 'Enter', ',', ';'].includes(event.key)) {
          event.preventDefault();
          addValue(input);
        }

        if (['Backspace', 'Delete'].includes(event.key)) {
          if (event.currentTarget.textContent !== '') {
            return;
          }

          labelReference.current.at(-1)?.focus();
        }
      },
      [addValue, input],
    );

    const handleLabelEdit = React.useCallback(
      (item: string) => {
        setValues({type: 'remove', payload: item});

        if (!editableReference.current) return;

        editableReference.current.textContent = item;
        editableReference.current.focus();
        setInput(item);
      },
      [editableReference, setInput],
    );

    const handleLabelDelete = React.useCallback(
      (item: string) => {
        setValues({type: 'remove', payload: item});
        editableReference.current?.focus();
      },
      [editableReference],
    );

    React.useEffect(() => {
      const existingValue = JSON.stringify(value);
      const newValue = JSON.stringify(values);
      if (existingValue === newValue) {
        return;
      }

      onChange?.(values);
    }, [values, onChange, value]);

    React.useEffect(() => {
      setValues({type: 'replace', payload: value ?? []});
    }, [value]);

    return (
      <div className="relative w-full" data-name={name}>
        <div
          className="flex w-full flex-wrap items-center gap-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          role="presentation"
          onClick={() => editableReference.current?.focus()}
        >
          {placeholder && !values?.length && !input && (
            <div className="pointer-events-none absolute text-muted-foreground" role="presentation">
              {placeholder}
            </div>
          )}
          {values.map((item, index) => (
            <InputChipsLabel
              ref={(reference_) => {
                labelReference.current[index] = reference_ ?? undefined;
                labelReference.current = labelReference.current.filter(Boolean);
              }}
              key={index}
              value={item}
              onDelete={handleLabelDelete}
              onEdit={handleLabelEdit}
            />
          ))}
          <div className="relative min-w-16 grow">
            <div className="pointer-events-none absolute text-inherit">{input}</div>
            <div
              ref={editableReference}
              contentEditable
              className="bg-transparent text-transparent caret-primary outline-none"
              role="textbox"
              tabIndex={0}
              aria-placeholder={placeholder}
              onInput={handleInput}
              onKeyDown={handleInputKeydown}
              onBlur={handleInputBlur}
            />
          </div>
        </div>
      </div>
    );
  },
);
InputChips.displayName = 'InputChips';

type InputChipsChipProps = {
  readonly children: React.ReactNode;
  readonly extras?: React.ReactNode;
} & React.HTMLProps<HTMLSpanElement>;

const InputChipsChip = React.forwardRef<HTMLSpanElement, InputChipsChipProps>(
  ({className, children, extras, ...props}, ref) => (
    <span
      ref={ref}
      className={cn(
        // TODO: correct usage of slate colors to use named theme colors
        'mb-0.5 mr-0.5 inline-flex items-center rounded border px-1 text-xs font-medium ring-offset-background hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  ),
);

export {InputChips};

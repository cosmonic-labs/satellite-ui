import {XCircleIcon} from 'lucide-react';
import * as React from 'react';
import {HostLabel} from '@/components/host-label/index.jsx';
import {useForwardedRef} from '@/hooks/use-forwarded-ref.js';
import {cn} from '@/util/cn.js';

// TODO: combine with input-chips

type KeyValuePair = {
  key: string;
  value: string;
};

type KeyValueReducerAction =
  | {
      payload: KeyValuePair;
      type: 'add' | 'remove';
    }
  | {
      payload: KeyValuePair[];
      type: 'multiple' | 'replace';
    };

function kvReducer(state: KeyValuePair[], action: KeyValueReducerAction): KeyValuePair[] {
  const {type, payload} = action;
  switch (type) {
    case 'add': {
      const kvPair = payload;
      // If the key already exists, shift the new value to the end of the list
      const existing = state.findIndex((item) => item.key === action.payload.key);
      if (existing !== -1) {
        return [...state.slice(0, existing), ...state.slice(existing + 1), kvPair];
      }

      return [...state, kvPair];
    }

    case 'remove': {
      return state.filter((item) => item.key !== action.payload.key);
    }

    case 'multiple': {
      return [...state, ...action.payload];
    }

    case 'replace': {
      return action.payload;
    }
  }
}

type KeyValueLabelProperties = {
  readonly item: KeyValuePair;
  readonly onDelete?: (item: KeyValuePair) => void;
  readonly onEdit?: (item: KeyValuePair) => void;
};

const KeyValueLabel = React.forwardRef<HTMLSpanElement, KeyValueLabelProperties>(
  ({item, onEdit, onDelete}, reference): React.ReactElement => {
    const handleDoubleClick = React.useCallback(() => onEdit?.(item), [item, onEdit]);
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (['Backspace', 'Delete'].includes(event.key)) {
          event.preventDefault();
          onDelete?.(item);
        }

        if (['Enter'].includes(event.key)) {
          event.preventDefault();
          onEdit?.(item);
        }
      },
      [item, onDelete, onEdit],
    );

    return (
      <HostLabel
        ref={reference}
        className="text-sm ring-offset-background hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        pKey={item.key}
        pVal={item.value}
        extras={
          <XCircleIcon
            className="size-3.5 text-destructive"
            strokeWidth={1.5}
            onClick={() => onDelete?.(item)}
          />
        }
        tabIndex={0}
        onClick={(event) => {
          event.currentTarget.focus();
        }}
        onKeyDown={handleKeyDown}
        onDoubleClick={handleDoubleClick}
      />
    );
  },
);
KeyValueLabel.displayName = 'KeyValueLabel';

type KeyValueInputProperties = {
  readonly onChange?: (kvPairs: KeyValuePair[]) => void;
  readonly value?: KeyValuePair[];
  readonly onBlur?: () => void;
  readonly name?: string;
  readonly placeholder?: string;
};

const KeyValueInput = React.forwardRef<HTMLDivElement, KeyValueInputProperties>(
  ({onChange, onBlur, placeholder, name, value}, reference): React.ReactElement => {
    const labelReference = React.useRef<Array<HTMLSpanElement | undefined>>([]);
    const [isValid, setIsValid] = React.useState(true);
    const [kvPairs, setKvPairs] = React.useReducer(kvReducer, value ?? []);
    const editableReference = useForwardedRef(reference);
    const [input, setInput] = React.useState('');
    const parts = React.useMemo(() => getParts(input), [input]);

    const addKvPair = React.useCallback(
      (input: string) => {
        const payload = getParts(input);
        setIsValid(!payload.rest);
        if (!payload.key || !payload.value) {
          return;
        }

        setKvPairs({type: 'add', payload: {key: payload.key, value: payload.value}});
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
      addKvPair(input);
      onBlur?.();
    }, [addKvPair, input, onBlur]);

    const handleInputKeydown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (['Space', 'Enter', ',', ';'].includes(event.key)) {
          event.preventDefault();
          addKvPair(input);
        }

        if (['Backspace', 'Delete'].includes(event.key)) {
          if (event.currentTarget.textContent !== '') {
            return;
          }

          labelReference.current.at(-1)?.focus();
        }
      },
      [addKvPair, input],
    );

    const handleLabelEdit = React.useCallback(
      (item: KeyValuePair) => {
        setKvPairs({type: 'remove', payload: item});
        if (!editableReference.current) {
          return;
        }

        const newInput = `${item.key}=${item.value}`;
        editableReference.current.textContent = newInput;
        editableReference.current.focus();
        setInput(newInput);
      },
      [editableReference, setInput],
    );

    const handleLabelDelete = React.useCallback(
      (item: KeyValuePair) => {
        setKvPairs({type: 'remove', payload: item});
        editableReference.current?.focus();
      },
      [editableReference],
    );

    React.useEffect(() => {
      const existingValue = JSON.stringify(value);
      const newValue = JSON.stringify(kvPairs);
      if (existingValue === newValue) {
        return;
      }

      onChange?.(kvPairs);
    }, [kvPairs, onChange, value]);

    React.useEffect(() => {
      setKvPairs({type: 'replace', payload: value ?? []});
    }, [value]);

    return (
      <div className="relative w-full" data-name={name}>
        <div
          className={cn(
            'flex w-full flex-wrap items-center gap-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            !isValid && 'border-destructive',
          )}
          role="presentation"
          onClick={() => editableReference.current?.focus()}
        >
          {placeholder && !kvPairs?.length && !input && (
            <div className="pointer-events-none absolute text-muted-foreground" role="presentation">
              {placeholder}
            </div>
          )}
          {kvPairs.map((item, index) => (
            <KeyValueLabel
              ref={(reference_) => {
                labelReference.current[index] = reference_ ?? undefined;
                labelReference.current = labelReference.current.filter(Boolean);
              }}
              key={index}
              item={item}
              onDelete={handleLabelDelete}
              onEdit={handleLabelEdit}
            />
          ))}
          <div className="relative min-w-16 grow">
            <div className="pointer-events-none absolute">
              <span className="text-cosmo-purple dark:text-purple-400">{parts.key}</span>
              <span className="text-inherit">{parts.sep}</span>
              <span className="text-slate-800 dark:text-slate-300">{parts.value}</span>
              <span className="text-destructive">{parts.rest}</span>
            </div>
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
        {!isValid && (
          <div className="mt-1 text-[0.8rem] font-medium text-destructive">
            Invalid key-value pair
          </div>
        )}
      </div>
    );
  },
);
KeyValueInput.displayName = 'KeyValueInput';

function getParts(input: string): {key: string; sep: string; value: string; rest: string} {
  const pattern =
    /^(?:(?<key>[\dA-Za-z](?:[\w-.]{0,61}[\dA-Za-z])?)(?:(?<sep>[:=])(?<value>[\dA-Za-z](?:[\w-.]{0,61}[\dA-Za-z])?)?)?)?(?<rest>.*?)?$/;
  const result = pattern.exec(input)?.groups;
  return {
    key: result?.key ?? '',
    sep: result?.sep ?? '',
    value: result?.value ?? '',
    rest: result?.rest ?? '',
  };
}

export {KeyValueInput};

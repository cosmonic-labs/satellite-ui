import type * as LabelPrimitive from '@radix-ui/react-label';
import {Slot} from '@radix-ui/react-slot';
import * as React from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
} from 'react-hook-form';
import {Label} from '@/components/label/index.jsx';
import {cn} from '@/util/cn.js';
import {formFieldContext, formItemContext} from './context.js';
import {useFormField} from './use-form-field.js';

const Form = FormProvider;

function FormField<
  FieldValuesType extends FieldValues = FieldValues,
  NameType extends FieldPath<FieldValuesType> = FieldPath<FieldValuesType>,
>({...properties}: ControllerProps<FieldValuesType, NameType>): React.ReactElement {
  const value = React.useMemo(() => ({name: properties.name}), [properties.name]);
  return (
    <formFieldContext.Provider value={value}>
      <Controller {...properties} />
    </formFieldContext.Provider>
  );
}

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...properties}, reference) => {
    const id = React.useId();
    const value = React.useMemo(() => ({id}), [id]);

    return (
      <formItemContext.Provider value={value}>
        <div ref={reference} className={cn('flex flex-col space-y-2', className)} {...properties} />
      </formItemContext.Provider>
    );
  },
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({className, ...properties}, reference) => {
  const {error, formItemId} = useFormField();

  return (
    <Label
      ref={reference}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...properties}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({...properties}, reference) => {
  const {error, formItemId, formDescriptionId, formMessageId} = useFormField();

  return (
    <Slot
      ref={reference}
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`}
      aria-invalid={Boolean(error)}
      {...properties}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...properties}, reference) => {
  const {id, formDescriptionId} = useFormField();

  return (
    <p
      ref={reference}
      id={id ? formDescriptionId : undefined}
      className={cn('text-[0.8rem] text-muted-foreground', className)}
      {...properties}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({className, children, ...properties}, reference) => {
  const {error, formMessageId} = useFormField();
  const body = error ? String(error?.message ?? '') || children : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={reference}
      id={formMessageId}
      className={cn('text-[0.8rem] font-medium text-destructive', className)}
      {...properties}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

export {Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField};

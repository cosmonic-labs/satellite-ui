import * as React from 'react';
import {type FieldError, useFormContext} from 'react-hook-form';
import {formFieldContext, formItemContext} from './context.js';

type UseFormFieldResult = {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error?: FieldError | undefined;
  id: string;
  name: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
};

export const useFormField = (): UseFormFieldResult => {
  const fieldContext = React.useContext(formFieldContext);
  const itemContext = React.useContext(formItemContext);
  const {getFieldState, formState} = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const {id} = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

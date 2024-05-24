import * as React from 'react';
import {useFormContext} from 'react-hook-form';
import {formFieldContext, formItemContext} from './context.js';

export const useFormField = () => {
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

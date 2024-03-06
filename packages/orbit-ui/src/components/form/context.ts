import * as React from 'react';
import {type FieldPath, type FieldValues} from 'react-hook-form';

type FormFieldContext<
  FieldValuesType extends FieldValues = FieldValues,
  NameType extends FieldPath<FieldValuesType> = FieldPath<FieldValuesType>,
> = {
  name: NameType;
};

export const formFieldContext = React.createContext<FormFieldContext>({} as FormFieldContext);

type FormItemContext = {
  id: string;
};

export const formItemContext = React.createContext<FormItemContext>({} as FormItemContext);

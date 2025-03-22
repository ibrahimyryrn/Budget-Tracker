import * as React from "react";
import { type FieldPath, type FieldValues } from "react-hook-form";

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export const FormFieldContext = React.createContext<
  FormFieldContextValue | undefined
>(undefined);

export type FormItemContextValue = {
  id: string;
};

export const FormItemContext = React.createContext<
  FormItemContextValue | undefined
>(undefined);

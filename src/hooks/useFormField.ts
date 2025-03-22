import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormFieldContext, FormItemContext } from "../context/form-context";

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();

  if (!fieldContext) {
    throw new Error(
      "useFormField must be used within a FormFieldContext.Provider"
    );
  }

  if (!itemContext) {
    throw new Error(
      "useFormField must be used within a FormItemContext.Provider"
    );
  }

  const fieldState = getFieldState(fieldContext.name);
  const id = itemContext.id;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

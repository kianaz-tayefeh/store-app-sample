import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
} from "react-hook-form";
import React from "react";
import { BoxMargin } from "./Shared";

export type TextFieldElementProps = Omit<TextFieldProps, "name"> & {
  name: string;
  control?: Control<any>;
  label: string;
  parseError?: (error: FieldError) => string | undefined;
};

export default function TextFieldElement({
  // er,
  // parseError,
  parseError,
  name,
  label,
  required,
  control,
  ...rest
}: TextFieldElementProps): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange },
        fieldState: { error, invalid },
      }) => (
        <BoxMargin>
          <TextField
            {...rest}
            onChange={onChange}
            value={value || ""}
            label={label}
            required={required}
            error={invalid}
            helperText={
              error
                ? typeof parseError === "function"
                  ? parseError(error)
                  : error.message
                : rest.helperText
            }
          />
        </BoxMargin>
      )}
    />
  );
}

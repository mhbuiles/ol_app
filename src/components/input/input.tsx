import { type Component } from "@app/types";
import { BaseInput, type BaseInputProps } from "./base-input";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = Omit<
  BaseInputProps,
  | "name"
  | "multiline"
  | "value"
  | "onChange"
  | "SelectProps"
  | "error"
  | "fullWidth"
> & {
  name: string;
  icon?: React.ReactNode;
  min?: string;
  max?: string;
};

const Input: Component<InputProps> = ({
  name,
  icon: Icon,
  min,
  max,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller<Record<string, string>>
      defaultValue=""
      name={name}
      control={control}
      render={({
        field: { onChange, value, ref },
        fieldState: { error, isTouched },
      }) => (
        <BaseInput
          {...props}
          inputRef={ref}
          name={name}
          fullWidth
          id={name}
          value={value ?? ""}
          onChange={onChange}
          error={!!error?.message}
          helperText={!(error && isTouched) ? error?.message : null}
          InputProps={{
            endAdornment: Icon ? Icon : null,
            inputProps: {
              max,
              min,
            },
          }}
        />
      )}
    />
  );
};

export { Input };
export type { InputProps };

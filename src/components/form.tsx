import type { AnyObjectSchema } from "yup";
import Box from "@mui/material/Box";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import type {
  SubmitErrorHandler,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import type { SxProps, Theme } from "@mui/material";

type SubmitHandler<
  TFormValues extends Record<string, unknown>,
  TContext extends Record<string, unknown> = Record<string, unknown>,
> = (data: TFormValues, methods: UseFormReturn<TFormValues, TContext>) => void;

type FormWithoutFormMethodsProps<
  TFormValues extends Record<string, unknown>,
  TContext extends Record<string, unknown> = Record<string, unknown>,
> = {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children:
    | ((methods: UseFormReturn<TFormValues, TContext>) => React.ReactElement)
    | React.ReactNode;
  onSubmit?: SubmitHandler<TFormValues, TContext>;
  onError?: SubmitErrorHandler<TFormValues>;
  useFormOptions?: UseFormProps<TFormValues>;
  formMethods?: never;
  sx?: SxProps<Theme>;
  schema?: AnyObjectSchema;
};

type FormWithFormMethodsProps<
  TFormValues extends Record<string, unknown>,
  TContext extends Record<string, unknown> = Record<string, unknown>,
> = Omit<
  FormWithoutFormMethodsProps<TFormValues, TContext>,
  "useFormOptions" | "formMethods" | "schema"
> & {
  useFormOptions?: never;
  formMethods: UseFormReturn<TFormValues, TContext>;
  schema?: never;
};

type FormProps<
  TFormValues extends Record<string, unknown>,
  TContext extends Record<string, unknown> = Record<string, unknown>,
> =
  | FormWithoutFormMethodsProps<TFormValues, TContext>
  | FormWithFormMethodsProps<TFormValues, TContext>;

export const Form = <
  TFormValues extends Record<string, unknown>,
  TContext extends Record<string, unknown> = Record<string, unknown>,
>({
  onSubmit,
  onError,
  children,
  sx,
  formMethods,
  useFormOptions,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  schema,
}: FormProps<TFormValues, TContext>): React.ReactElement => {
  const defaultMethods = useForm<TFormValues, TContext>({
    ...useFormOptions,
    resolver: schema ? yupResolver(schema) : undefined,
  });

  const methods = formMethods ?? defaultMethods;

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        onSubmit={
          onSubmit
            ? methods.handleSubmit((data) => {
                onSubmit(data, methods);
              }, onError)
            : undefined
        }
        sx={sx}
      >
        {typeof children === "function" ? children(methods) : children}
      </Box>
    </FormProvider>
  );
};

export type { SubmitHandler, FormProps };

import { type Component } from "@app/types";
import Stack from "@mui/material/Stack";
import { Typography } from "@components/typography";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

type BaseInputProps = Omit<
  TextFieldProps,
  "className" | "classes" | "style" | "color"
> & {
  outerLabel?: React.ReactNode;
};

const BaseInput: Component<BaseInputProps> = ({ outerLabel, ...props }) => (
  <Stack spacing="0.45rem" width="100%">
    {(() => {
      if (outerLabel) {
        if (typeof outerLabel === "string") {
          return (
            <Typography
              color="text.primary"
              variant="body1"
              marginBottom="0.3rem"
            >
              {outerLabel}
            </Typography>
          );
        }

        return outerLabel;
      }

      return null;
    })()}

    <TextField
      {...props}
      sx={{
        "input:-webkit-autofill": {
          WebkitBoxShadow: `0 0 0px 1000px transparent inset`,
          transition: "background-color 5000s ease-in-out 0s",
        },
        ".MuiInputBase-root": {
          borderRadius: "6px",
          background: "transparent",
          borderColor: "other.outlinedBorder",

          svg: {
            height: "1.4rem",
            width: "1.4rem",
          },

          "&:not(.Mui-disabled) svg": {
            color: "action.active",
          },

          ".MuiInputBase-input": {
            "&:focus": {
              boxShadow: "none",
            },

            fontSize: "1rem",
            lineHeight: "1.5rem",
            fontWeight: 400,
          },

          "&.Mui-focused.MuiInputBase-adornedEnd svg": {
            color: "primary.main",
          },
        },
        ...props.sx,
      }}
    />
  </Stack>
);

export { BaseInput };
export type { BaseInputProps };

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Box from "@mui/material/Box";
import type { Component } from "@app/types";
import MUIButton from "@mui/material/Button";
import type { ButtonProps as MUIButtonProps } from "@mui/material/Button";
import { type ElementType, forwardRef } from "react";

type ButtonProps = Omit<
  MUIButtonProps,
  "sx" | "className" | "disableElevation" | "style" | "classes"
> &
  Partial<{
    rounded: boolean;
    component: ElementType;
    loading: boolean;
    block: boolean;
  }>;

// @ts-expect-error: We are intentionally ignoring the error here.
const Button: Component<ButtonProps> = forwardRef(
  (
    {
      color,
      rounded,
      loading,
      block,
      disabled,
      size = "medium",
      type = "button",
      disableRipple,
      variant,
      ...props
    },
    ref,
  ) => {
    const getStyle = () => {
      const style = {
        large: {
          fontSize: "0.93rem",
          lineHeight: "1.625rem",
        },
        medium: {
          fontSize: "0.875rem",
          lineHeight: "1.5rem",
        },
        small: {
          fontSize: "0.812rem",
          lineHeight: "1.375rem",
        },
      };

      return style[size];
    };

    return (
      <MUIButton
        {...props}
        disableElevation
        color={color}
        type={type}
        ref={ref}
        sx={{
          ...getStyle(),
          borderRadius: rounded ? "1.5rem" : "0.625rem",
          textTransform: "inherit",
          fontWeight: 500,
          width: block ? "100%" : "auto",
          padding: disableRipple ? 0 : "0.4rem 1rem",
          ...(variant === "text" && {
            minWidth: 0,
            ":hover": {
              backgroundColor: "transparent",
            },
          }),
        }}
        {...(loading && {
          startIcon: (
            <Box
              sx={{
                animation: "spin 1s linear infinite",
                "@keyframes spin": {
                  to: {
                    transform: "rotate(360deg)",
                  },
                },
              }}
            >
              <AiOutlineLoading3Quarters />
            </Box>
          ),
        })}
        disabled={loading || disabled}
        variant={variant}
      />
    );
  },
);

Button.displayName = "Button";

export type { ButtonProps };
export { Button };

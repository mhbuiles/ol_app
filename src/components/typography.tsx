import type { Component } from "@app/types";
import type { ElementType } from "react";
import MUITypography from "@mui/material/Typography";
import type { TypographyProps as MUITypographyProps } from "@mui/material/Typography";

type TypographyProps = Partial<{
  wrap: "balance";
  wordWrap: string;
  variant:
    | "headline1"
    | "headline2"
    | "headline3"
    | "headline4"
    | "headline5"
    | "headline6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "overline";
  textDecoration: "underline";
  textOrientation: "vertical";
  component: ElementType;
}> &
  Pick<
    MUITypographyProps,
    | "id"
    | "color"
    | "align"
    | "marginBottom"
    | "marginLeft"
    | "marginRight"
    | "paddingLeft"
    | "width"
    | "marginTop"
    | "textTransform"
    | "noWrap"
    | "fontWeight"
  >;

const getProps = ({
  wrap,
  variant = "body1",
  textDecoration,
  fontWeight,
  component,
  textOrientation,
  wordWrap,
  ...props
}: TypographyProps): MUITypographyProps => {
  const config = {
    headline1: {
      sx: {
        fontSize: "6rem",
        letterSpacing: "-0.09rem",
        lineHeight: "7rem",
        fontWeight: "500",
      },
      component: component || "h1",
    },
    headline2: {
      sx: {
        fontSize: "3.75rem",
        letterSpacing: "-0.03rem",
        lineHeight: "4.5rem",
        fontWeight: "500",
      },
      component: component || "h2",
    },
    headline3: {
      sx: {
        fontSize: "3rem",
        letterSpacing: "0rem",
        lineHeight: "3.5rem",
        fontWeight: "500",
      },
      component: component || "h3",
    },
    headline4: {
      sx: {
        fontSize: "2rem",
        letterSpacing: "0.01rem",
        lineHeight: "2.5rem",
        fontWeight: "500",
      },
      component: component || "h4",
    },
    headline5: {
      sx: {
        fontSize: "1.5rem",
        letterSpacing: "0rem",
        lineHeight: "2rem",
        fontWeight: "500",
      },
      component: component || "h5",
    },
    headline6: {
      sx: {
        fontSize: "1.25rem",
        letterSpacing: "0.009rem",
        lineHeight: "2rem",
        fontWeight: "500",
      },
      component: component || "h6",
    },
    subtitle1: {
      sx: {
        fontSize: "1rem",
        letterSpacing: "0.009rem",
        lineHeight: "1.75rem",
        fontWeight: "400",
      },
      component: component || "p",
    },
    subtitle2: {
      sx: {
        fontSize: "0.875rem",
        letterSpacing: "0.006rem",
        lineHeight: "1.375rem",
        fontWeight: "500",
      },
      component: component || "p",
    },
    body1: {
      sx: {
        fontSize: "1rem",
        letterSpacing: "0.009rem",
        lineHeight: "1.5rem",
        fontWeight: "400",
      },
      component: component || "p",
    },
    body2: {
      sx: {
        fontSize: "0.875rem",
        letterSpacing: "0.009rem",
        lineHeight: "1.25rem",
        fontWeight: "400",
      },
      component: component || "p",
    },
    caption: {
      sx: {
        fontSize: "0.75rem",
        letterSpacing: "0.025rem",
        lineHeight: "0.937rem",
        fontWeight: "400",
      },
      component: component || "p",
    },
    overline: {
      sx: {
        fontSize: "0.75rem",
        letterSpacing: "0.06rem",
        lineHeight: "0.937rem",
        fontWeight: "400",
      },
      component: component || "p",
    },
  };

  const variantConfig = config[variant];
  const sx = variantConfig.sx;

  return {
    ...props,
    ...variantConfig,
    variant,
    sx: {
      ...sx,
      ...(wrap && {
        textWrap: wrap,
      }),
      wordWrap,
      textDecoration,
      fontWeight: fontWeight || sx.fontWeight,
      ...(textOrientation === "vertical" && {
        transform: "rotate(-90deg)",
      }),
    },
  } as MUITypographyProps;
};

const Typography: Component<TypographyProps> = (props) => (
  <MUITypography {...getProps(props)} />
);

export { Typography };
export type { TypographyProps };

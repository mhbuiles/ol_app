import type { Component } from "@app/types";
import { breakpoints } from "@utils/hooks";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    "2xs": true;
    sm: false;
    md: true;
    lg: true;
    xl: true;
    "2xl": true;
    "3xl": true;
  }

  interface TypeBackground {
    body: string;
  }

  interface SimplePaletteColorOptions {
    containedHoverBackground: string;
    outlinedHoverBackground: string;
    outlinedRestingBackground: string;
  }

  type OtherPaletteOptions = {
    outlinedBorder: string;
    inputLine: string;
    overlay: string;
    snackbarBackground: string;
    paper: string;
    card: string;
    filledInputBackground: string;
    chipBackground: string;
    ratingActive: string;
    tooltip: string;
  };

  type CustomBackgroundOptions = {
    primary: string;
    secondary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    menuActive: string;
    pageHeaderBackground: string;
    border: string;
    extraBG: string;
  };

  interface PaletteOptions {
    other: OtherPaletteOptions;
    customBackground: CustomBackgroundOptions;
    gray: {
      [50]: string;
      [100]: string;
      [200]: string;
      [300]: string;
      [400]: string;
      [500]: string;
      [600]: string;
      [700]: string;
      [800]: string;
      [900]: string;
      A100: string;
      A200: string;
      A400: string;
      A700: string;
    };
  }

  interface Palette {
    other: OtherPaletteOptions;
    customBackground: CustomBackgroundOptions;
  }
}

const lightPalette = {
  primary: {
    main: "rgba(25, 42, 86, 1)",
    light: "rgba(93, 122, 160, 1)",
    dark: "rgba(0, 18, 55, 1)",
    contrastText: "rgba(255, 255, 255, 1)",
    containedHoverBackground: "rgba(0, 70, 140, 1)",
    outlinedHoverBackground: "rgba(25, 42, 86, 0.05)",
    outlinedRestingBackground: "rgba(25, 42, 86, 0.5)",
  },
  secondary: {
    main: "rgba(36, 37, 44, 1)",
    light: "rgba(36, 37, 44, 1)",
    dark: "rgba(78, 80, 90, 1)",
    contrastText: "rgba(255, 255, 255, 1)",
    containedHoverBackground: "rgba(53, 55, 63, 0.8)",
    outlinedHoverBackground: "rgba(53, 55, 63, 0.05)",
    outlinedRestingBackground: "rgba(53, 55, 63, 0.5)",
  },
  info: {
    main: "rgba(81, 198, 219, 1)",
    light: "rgba(64, 205, 250, 1)",
    dark: "rgba(33, 174, 219, 1)",
    contrastText: "rgba(255, 255, 255, 1)",
    containedHoverBackground: "rgba(31, 162, 204, 1)",
    outlinedHoverBackground: "rgba(38, 198, 249, 0.05)",
    outlinedRestingBackground: "rgba(38, 198, 249, 0.5)",
  },
  success: {
    main: "rgba(114, 225, 40, 1)",
    light: "rgba(131, 229, 66, 1)",
    dark: "rgba(100, 198, 35, 1)",
    contrastText: "rgba(255, 255, 255, 1)",
    containedHoverBackground: "rgba(93, 185, 33, 1)",
    outlinedHoverBackground: "rgba(114, 225, 40, 0.05)",
    outlinedRestingBackground: "rgba(114, 225, 40, 0.05)",
  },
  warning: {
    main: "rgba(255, 164, 0, 1)",
    light: "rgba(255, 174, 28, 1)",
    dark: "rgba(253, 190, 66, 1)",
    contrastText: "rgba(255, 255, 255, 1)",
    containedHoverBackground: "rgba(207, 148, 33, 1)",
    outlinedHoverBackground: "rgba(253, 181, 40, 0.05)",
    outlinedRestingBackground: "rgba(253, 181, 40, 0.5)",
  },
  error: {
    main: "rgba(255, 77, 73, 1)",
    light: "rgba(255, 98, 95, 1)",
    dark: "rgba(224, 68, 64, 1)",
    contrastText: "rgba(255, 255, 255, 1)",
    containedHoverBackground: "rgba(209, 63, 60, 1)",
    outlinedHoverBackground: "rgba(255, 77, 73, 0.05)",
    outlinedRestingBackground: "rgba(255, 77, 73, 0.5)",
  },
  text: {
    primary: "rgba(76, 78, 100, 1)",
    secondary: "rgba(76, 78, 100, 0.68)",
    disabled: "rgba(76, 78, 100, 0.38)",
  },
  action: {
    active: "rgba(76, 78, 100, 0.54)",
    hover: "rgba(76, 78, 100, 0.05)",
    selected: "rgba(76, 78, 100, 0.08)",
    disabled: "rgba(76, 78, 100, 0.26)",
    disabledBackground: "rgba(76, 78, 100, 0.12)",
    focus: "rgba(76, 78, 100, 0.12)",
  },
  divider: "rgba(76, 78, 100, 0.12)",
  background: {
    default: "rgba(247, 247, 249, 1)",
    paper: "rgba(255, 255, 255, 1)",
    body: "rgba(240, 240, 240, 1)",
  },
  other: {
    outlinedBorder: "rgba(76, 78, 100, 0.22)",
    inputLine: "rgba(76, 78, 100, 0.22)",
    overlay: "rgba(76, 78, 100, 0.5)",
    snackbarBackground: "rgba(33, 33, 33, 1)",
    paper: "rgba(255, 255, 255, 1)",
    card: "rgba(255, 255, 255, 1)",
    filledInputBackground: "rgba(76, 78, 100, 0.04)",
    chipBackground: "rgba(58, 53, 65, 0.08)",
    ratingActive: "rgba(253, 181, 40, 1)",
    tooltip: "rgba(38, 39, 50, 0.9)",
  },
  customBackground: {
    primary: "rgba(255, 234, 224, 1)",
    secondary: "rgba(194, 185, 246, 1)",
    info: "rgba(229, 248, 254, 1)",
    success: "rgba(238, 251, 229, 1)",
    warning: "rgba(255, 246, 229, 1)",
    error: "rgba(255, 234, 233, 1)",
    menuActive: "rgba(255, 78, 0, 1)",
    pageHeaderBackground: "rgba(245, 245, 247, 1)",
    border: "rgba(58, 53, 65, 0.3)",
    extraBG: "rgb(255, 255, 255)",
  },
  gray: {
    "50": "rgba(250, 250, 250, 1)",
    "100": "rgba(245, 245, 245, 1)",
    "200": "rgba(238, 238, 238, 1)",
    "300": "rgba(224, 224, 224, 1)",
    "400": "rgba(189, 189, 189, 1)",
    "500": "rgba(158, 158, 158, 1)",
    "600": "rgba(117, 117, 117, 1)",
    "700": "rgba(97, 97, 97, 1)",
    "800": "rgba(66, 66, 66, 1)",
    "900": "rgba(33, 33, 33, 1)",
    A100: "rgba(213, 213, 213, 1)",
    A200: "rgba(170, 170, 170, 1)",
    A400: "rgba(97, 97, 97, 1)",
    A700: "rgba(48, 48, 48, 1)",
  },
};

const getDesign = () =>
  ({
    palette: lightPalette,
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
    },
    components: {
      MuiSkeleton: {
        defaultProps: {
          variant: "rounded",
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "background-color 0.3s ease",
          },
          "*::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
            backgroundColor: "transparent",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            background: "rgba(189, 189, 189, 1)",
            borderRadius: "8px",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s ease",
            boxShadow: "0px 2px 10px rgba(76, 78, 100, 0.22)",
            borderRadius: "10px",
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
          },
        },
      },
    },
    breakpoints: {
      values: breakpoints,
    },
  }) as const;

const ThemeProvider: Component = ({ children }) => {
  // @ts-expect-error: this is a expected type error
  const theme = createTheme(getDesign());

  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};

export { ThemeProvider };

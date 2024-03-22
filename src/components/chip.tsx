import { type VoidComponent } from "@app/types";
import { useTheme } from "@mui/material";
import MUIChip, { type ChipProps as MUIChipProps } from "@mui/material/Chip";

type ChipProps = Pick<
  MUIChipProps,
  "label" | "color" | "onDelete" | "size" | "icon"
> & {
  capitalize?: boolean;
};

type Color = MUIChipProps["color"];

const Chip: VoidComponent<ChipProps> = ({
  color = "default",
  capitalize,
  ...props
}) => {
  const { palette } = useTheme();

  const CONFIG = {
    primary: palette.customBackground.primary,
    info: palette.customBackground.info,
    error: palette.customBackground.error,
    warning: palette.customBackground.warning,
    secondary: palette.customBackground.secondary,
    success: palette.customBackground.success,
  } satisfies Partial<Record<NonNullable<typeof color>, string>>;

  return (
    <MUIChip
      {...props}
      sx={{
        textTransform: capitalize ? "capitalize" : "unset",
        fontWeight: 400,
        ...(color !== "default" && {
          backgroundColor: CONFIG[color],
          color: palette[color].main,
        }),
        padding: props.icon ? "0.25rem" : "",
      }}
    />
  );
};

export { Chip };
export type { Color };

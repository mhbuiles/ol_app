import MUIIconButton from "@mui/material/IconButton";
import type { IconButtonProps as MUIIconButtonProps } from "@mui/material/IconButton";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { Component, VoidComponent } from "@app/types";

type IconButtonProps = Omit<MUIIconButtonProps, "className"> & {
  icon?: VoidComponent | VoidComponent<SvgIconProps>;
};

const IconButton: Component<IconButtonProps> = ({
  icon: Icon,
  children,
  ...props
}) => (
  <MUIIconButton {...props}>
    {Icon ? <Icon /> : null}
    {children}
  </MUIIconButton>
);

export { IconButton };

import MUIIconButton from "@mui/material/IconButton";
import type { IconButtonProps as MUIIconButtonProps } from "@mui/material/IconButton";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { Component, VoidComponent } from "@app/types";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";

type IconButtonProps = Omit<MUIIconButtonProps, "className"> & {
  icon?: VoidComponent | VoidComponent<SvgIconProps>;
} & RouterLinkProps;

const IconLinkButton: Component<IconButtonProps> = ({
  icon: Icon,
  children,
  ...props
}) => (
  <MUIIconButton {...props} LinkComponent={RouterLink}>
    {Icon ? <Icon /> : null}
    {children}
  </MUIIconButton>
);

export { IconLinkButton };

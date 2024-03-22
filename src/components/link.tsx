import type { Component } from "@app/types";
import { forwardRef } from "react";
import { Button, type ButtonProps } from "./button";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";

type LinkProps = Omit<ButtonProps, "component"> & RouterLinkProps;

// @ts-expect-error: forwardRef expects a generic type
const Link: Component<LinkProps> = forwardRef((props, ref) => (
  <Button component={RouterLink} {...props} ref={ref} />
));

Link.displayName = "Link";

export { Link };

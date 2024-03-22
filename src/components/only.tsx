import { type Component } from "@app/types";
import { Fragment, type ReactNode } from "react";
import { type breakpoints, useBreakpoint } from "@utils/hooks";

type OnlyProps = {
  on: `${keyof typeof breakpoints}${"Up" | "Down"}`;
  children: ReactNode;
};

/**
 * @example
 * // Only show if my window is bigger than the lg breakpoint.
 * <Only on="lgUp">
 *   <SuperAdminSettings />
 * </Only>
 *
 * @example
 * // Only show if my window is smaller than the lg breakpoint.
 * <Only on="lgDown">
 *   <SuperAdminSettings />
 * </Only>
 */
export const Only: Component<OnlyProps> = ({ on, children }) => {
  const isMatch = useBreakpoint(on);

  return isMatch ? <Fragment>{children}</Fragment> : null;
};

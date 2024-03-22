import { Menu } from "@components/menu";
import { Children, type ReactNode, isValidElement } from "react";

const hasMenuChildren = (children: ReactNode): boolean => {
  return Children.toArray(children).some((child) => {
    if (isValidElement(child)) {
      return child.type === Menu;
    }

    return false;
  });
};

export { hasMenuChildren };

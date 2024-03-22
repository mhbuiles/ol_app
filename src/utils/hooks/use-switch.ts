import type { Dispatch, SetStateAction } from "react";
import { useCallback, useState } from "react";

export const useSwitch = (
  defaultOn = false,
): {
  isOn: boolean;
  toggle: Dispatch<SetStateAction<boolean>>;
  on: () => void;
  off: () => void;
  flip: () => void;
} => {
  const [isOn, toggle] = useState(defaultOn);

  const off = useCallback(() => toggle(false), []);

  const on = useCallback(() => toggle(true), []);

  const flip = useCallback(() => {
    toggle((isOn) => !isOn);
  }, []);

  return { isOn, toggle, on, off, flip };
};

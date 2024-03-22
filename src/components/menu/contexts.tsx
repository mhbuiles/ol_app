import { createContext, useCallback, useContext, useState } from "react";

type State = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onOpen: React.MouseEventHandler<HTMLElement>;
  open: boolean;
};

const Context = createContext<State | null>(null);

type MenuProviderProps = {
  children: (props: State) => React.ReactElement;
};

const MenuProvider = ({ children }: MenuProviderProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onOpen = useCallback<React.MouseEventHandler<HTMLElement>>((event) => {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();

    setAnchorEl(event.currentTarget);
  }, []);

  const onClose = useCallback((): void => setAnchorEl(null), []);
  const open = Boolean(anchorEl);

  return (
    <Context.Provider value={{ anchorEl, onClose, onOpen, open }}>
      {children({ anchorEl, onClose, onOpen, open })}
    </Context.Provider>
  );
};

const useMenu = (): State => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }

  return context;
};

export { MenuProvider, useMenu };

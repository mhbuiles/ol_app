import Stack from "@mui/material/Stack";
import { Typography } from "@components/typography";
import { hasMenuChildren } from "../utils";
import { useMenu } from "../contexts";
import { type Component, type VoidComponent } from "@app/types";
import MenuItem, { type MenuItemProps } from "@mui/material/MenuItem";

type ItemProps = Pick<MenuItemProps, "onClick" | "disabled"> & {
  icon?: VoidComponent;
};

const Item: Component<ItemProps> = ({
  onClick,
  disabled,
  children,
  icon: Icon,
}) => {
  const { onClose } = useMenu();
  const hasMenus = hasMenuChildren(children);

  return (
    <MenuItem
      onClick={(...args) => {
        onClose();
        if (!disabled) {
          onClick?.(...args);
        }
      }}
      sx={{
        justifyContent: "space-between",
        gap: "0.5rem",
        ...(hasMenus && {
          padding: 0,
        }),
        ...(disabled && {
          opacity: 0.5,
          cursor: "default",
          ":hover": {
            backgroundColor: "transparent",
          },
        }),
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        gap="0.5rem"
        justifyItems="center"
      >
        {Icon ? (
          <Typography color="text.secondary" variant="headline6">
            <Icon color="inherit" />
          </Typography>
        ) : null}
        {typeof children === "string" ? (
          <Typography variant="body1" color="text.primary">
            {children}
          </Typography>
        ) : (
          children
        )}
      </Stack>
    </MenuItem>
  );
};

export { Item };

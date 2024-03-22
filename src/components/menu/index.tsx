import Box from "@mui/material/Box";
import { type Component } from "@app/types";
import { Fragment } from "react";
import { IconButton } from "@components/icon-button";
import { Item } from "./components";
import { MenuProvider } from "./contexts";
import { Typography } from "@components/typography";
import MUIMenu, { type MenuProps as MUIMenuProps } from "@mui/material/Menu";
import { MdArrowRight, MdMoreVert } from "react-icons/md";

type MenuProps = {
  name: string;
  opener?: React.ReactNode;
  showIcon?: boolean;
} & Pick<MUIMenuProps, "anchorOrigin" | "transformOrigin" | "PaperProps">;

const Menu: Component<MenuProps> = ({
  name,
  children,
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOrigin = {
    vertical: "top",
    horizontal: "right",
  },
  opener,
  showIcon,
  ...props
}) => {
  const isStringOpener = typeof opener === "string";

  return (
    <MenuProvider>
      {({ onClose, onOpen, anchorEl, open }) => {
        const openerProps = {
          "aria-label": `open ${name}`,
          id: `${name} Button`,
          onClick: onOpen,
          "aria-controls": open ? `${name} Menu` : undefined,
          "aria-expanded": open ? true : undefined,
        };

        return (
          <Fragment>
            {opener ? (
              <Box
                {...openerProps}
                {...(showIcon && {
                  sx: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.5rem",
                  },
                })}
                {...(isStringOpener && {
                  padding: "0.4rem 1rem",
                })}
                width="100%"
              >
                {isStringOpener ? (
                  <Typography variant="body1" color="text.primary">
                    {opener}
                  </Typography>
                ) : (
                  opener
                )}
                {showIcon ? (
                  <Typography variant="headline5" color="action.active">
                    <MdArrowRight />
                  </Typography>
                ) : null}
              </Box>
            ) : (
              <IconButton {...openerProps} disableRipple>
                <Typography variant="headline5" color="text.secondary">
                  <MdMoreVert />
                </Typography>
              </IconButton>
            )}
            <MUIMenu
              {...props}
              keepMounted
              id={`${name} Menu`}
              open={!!anchorEl}
              onClose={onClose}
              anchorEl={anchorEl}
              anchorOrigin={anchorOrigin}
              transformOrigin={transformOrigin}
              MenuListProps={{
                "aria-labelledby": `${name} Button`,
              }}
            >
              {children}
            </MUIMenu>
          </Fragment>
        );
      }}
    </MenuProvider>
  );
};

export { Menu, Item };

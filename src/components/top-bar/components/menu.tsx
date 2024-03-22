import { type Component } from "@app/types";
import { IconButton } from "@components/icon-button";
import { RoutePaths } from "@utils/constants";
import { RxHamburgerMenu } from "react-icons/rx";
import { logout } from "@context/auth";
import { useAuth } from "@context/auth";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Menu as BaseMenu, Item } from "@components/menu";

const Menu: Component = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setData } = useAuth();

  return (
    <BaseMenu
      name="user"
      PaperProps={{
        elevation: 0,
        sx: {
          paddint: "2rem",
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          marginBlockStart: "0.5rem",
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: "1.3rem",
            width: "0.5rem  ",
            height: "0.5rem",
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      opener={
        <IconButton size="small" sx={{ height: "2.5rem", width: "2.5rem" }}>
          <RxHamburgerMenu />
        </IconButton>
      }
    >
      <Item onClick={() => navigate(RoutePaths.dashboard)}>Dashboard</Item>
      <Item onClick={() => navigate(RoutePaths.projects)}>Projects</Item>
      <Item onClick={() => navigate(RoutePaths.users)}>Users</Item>
      <Item onClick={() => logout(setData, queryClient, navigate)}>Logout</Item>
    </BaseMenu>
  );
};

export { Menu };

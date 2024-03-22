import { AiOutlineBell } from "react-icons/ai";
import { AvatarImage } from "@components/avatar-image";
import Divider from "@mui/material/Divider";
import { Fragment } from "react";
import { IconButton } from "@components/icon-button";
import { Menu } from "./components";
import { RoutePaths } from "@utils/constants";
import Stack from "@mui/material/Stack";
import { type VoidComponent } from "@app/types";
import { useBreakpoint } from "@utils/hooks";
import { useNavigate } from "react-router-dom";
import { useUser } from "@context/auth";

const TopBar: VoidComponent = () => {
  const isLgUp = useBreakpoint("lgUp");
  const navigate = useNavigate();

  const user = useUser();

  return (
    <Stack
      sx={{
        paddingInline: isLgUp ? "0.5rem 1.5rem" : "0",
      }}
    >
      <Stack
        direction="row"
        spacing="0.5rem"
        alignItems="center"
        justifyContent={"right"}
        sx={{
          paddingBlock: "0.75rem",
          backgroundColor: isLgUp ? "inherit" : "background.paper",
          paddingInline: !isLgUp ? "1rem" : "0",
        }}
      >
        <IconButton size="small" sx={{ height: "2.5rem", width: "2.5rem" }}>
          <AvatarImage url="" title={user.user.toUpperCase()} />
        </IconButton>
        <Fragment>
          <IconButton
            icon={AiOutlineBell}
            aria-label="Notifications"
            sx={{
              color: "text.primary",
            }}
            onClick={() => navigate(RoutePaths.notifications)}
          />
          <Stack>
            <Menu />
          </Stack>
        </Fragment>
      </Stack>
      <Divider />
    </Stack>
  );
};

export { TopBar };

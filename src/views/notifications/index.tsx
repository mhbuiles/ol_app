import { Box } from "@mui/material";
import { Chip } from "@components/chip";
import { Typography } from "@components/typography";
import { useNotifications } from "@services/notifications";

const Notifications = (): React.ReactElement => {
  const { data: notifications } = useNotifications();

  const getColor = (type: string) => {
    switch (type) {
      case "error":
        return "error";
      case "success":
        return "success";
      case "info":
        return "info";
      case "warning":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ paddingBlock: "5rem", paddingInline: "2rem" }}>
      <Typography variant="headline5" color="InfoText">
        Your notifications:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          marginBlockStart: "2rem",
        }}
      >
        {notifications?.map((notification) => (
          <Box
            key={notification.details}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography>{notification.details}</Typography>
              <Typography variant="caption">{notification.time}</Typography>
            </Box>
            <Chip
              label={notification.type}
              color={getColor(notification.type)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Notifications;

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import type { Component } from "@app/types";
import { Typography } from "@components/typography";
import { useSwitch } from "@utils/hooks";

type AvatarImageProps = {
  url?: string | null;
  title: string;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
};

const AvatarImage: Component<AvatarImageProps> = ({
  url,
  title,
  objectFit = "contain",
}) => {
  const { isOn, flip } = useSwitch(true);

  const getNameInitials = (value: string): string => {
    if (!value) return "-";
    const strings = value.split(" ");

    return strings.map((val) => val[0]).join("");
  };

  if (isOn && url) {
    return (
      <Box
        sx={{
          borderRadius: "50%",
          width: "100%",
          height: "100%",
          objectFit,
        }}
        component="img"
        src={url}
        alt={title}
        title={title}
        onError={flip}
      />
    );
  }

  return (
    <Avatar sx={{ width: "100%", height: "100%" }}>
      <Typography
        variant="subtitle1"
        color="primary.contrastText"
        align="center"
      >
        {getNameInitials(title)}
      </Typography>
    </Avatar>
  );
};

export { AvatarImage };

import { Button } from "@components/button";
import { Form } from "@components/form";
import { Input } from "@components/input";
import { Typography } from "@components/typography";
import { olLogo } from "@assets/index";
import { showToast } from "@utils/helpers";
import { useBreakpoint } from "@utils/hooks/use-breakpoint";
import { Box, Stack } from "@mui/material";
import { login, useAuth } from "@context/auth";
import { object, string } from "yup";

export type LoginFields = {
  user: string;
  password: string;
};

const Login = () => {
  const isMobile = useBreakpoint("smDown");
  const { setData } = useAuth();

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/login_background.png')",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: "100%",
        height: "100vh",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          maxWidth: "33rem",
          minWidth: "25rem",
          maxHeight: "40rem",
          width: isMobile ? undefined : "33rem",
          height: isMobile ? undefined : "40rem",
          padding: "5rem 2.5rem",
          borderRadius: "20px",
          border: "1px solid #EDECEE",
          boxShadow: "0px 0px 47px 0px rgba(0, 0, 0, 0.25)",
          gap: "3.5rem",
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
            flex: 1,
            marginBlockEnd: "2rem",
          }}
        >
          <Box
            component="img"
            src={olLogo}
            alt="OL Slogan"
            sx={{ maxWidth: "15rem" }}
          />
        </Stack>

        <Form<LoginFields>
          useFormOptions={{
            mode: "onChange",
            defaultValues: { user: "", password: "" },
          }}
          schema={object().shape({
            user: string()
              .required("User is required")
              .typeError("User is required"),
            password: string()
              .required("Password is required")
              .typeError("Password is required"),
          })}
          onSubmit={({ user, password }) => {
            showToast({
              promise: login(setData, { user, password }),
              loading: "Logging in...",
              success: "Logged in successfully",
              error: "Failed to log in",
            });
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            width: "100%",
          }}
        >
          <Typography variant="subtitle1" align="left">
            Welcome to OL Software
          </Typography>
          <Input name="user" placeholder="Username" />
          <Input type="password" name="password" placeholder="Password" />
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Stack sx={{ width: "10rem" }}>
              <Button
                type="submit"
                variant="contained"
                rounded
                size="large"
                fullWidth
              >
                Log in
              </Button>
            </Stack>
          </Stack>
          <Button variant="text" size="large">
            <Typography variant="body2" fontWeight="700">
              Forgot username or password?
            </Typography>
          </Button>
        </Form>
      </Stack>
    </Stack>
  );
};

export default Login;

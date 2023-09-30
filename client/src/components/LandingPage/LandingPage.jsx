import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import background from "../../assets/images/back_landing.jpg";
import { useTheme } from "@mui/material/styles";
import { isValidEmail, isValidPassword } from "./validations";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import title from "../../assets/images/title.png";

function SignInSide() {
  const [formVisible, setFormVisible] = useState(false);
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { isLogged, authenticate } = useAuthStore();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }

    if (!isValidPassword(password)) {
      setPasswordError(true);
      return;
    }

    try {
      await authenticate({ email, password });
    } catch (error) {
      console.error("Error de autenticación:", error.message);
    }
  };

  const handleAuthentication = () => {
    if (isLogged) {
      navigate("/home");
    }
  };

  useEffect(() => {
    if (isLogged) {
      handleAuthentication();
    }
  }, [isLogged]);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (!isValidEmail(newEmail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (!isValidPassword(newPassword)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFormVisible(true);
    }, 200);
  }, []);

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <img
        src={title}
        style={{
          position: "absolute",
          maxWidth: isDesktop ? "50vh" : "40vh",
          top: "10%",
          left: !isDesktop ? "50%" : "15%",
          transform: "translate(-50%, -50%)",
        }}
      />{" "}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: theme.palette.background.main,
        }}
      >
        <Box
          sx={{
            my: 10,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: formVisible ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <div style={{ display: "flex", marginTop: "4vh" }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: "white",
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.h2,
              }}
            >
              Sign in
            </Typography>
          </div>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              backgroundColor: theme.palette.background_ligth.main,
              padding: 4,
              borderRadius: 6,
              marginTop: 4,
            }}
          >
            <TextField
              error={emailError}
              onChange={handleEmailChange}
              margin="normal"
              required
              fullWidth
              id={emailError ? "outlined-error-helper-text" : "email"}
              label={emailError ? "Error" : "Email Address"}
              name="email"
              autoComplete="none"
              helperText={emailError ? "Invalid email format" : ""}
              value={email}
            />
            <TextField
              error={passwordError}
              onChange={handlePasswordChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label={passwordError ? "Error" : "Password"}
              type="password"
              autoComplete="current-password"
              id={passwordError ? "outlined-error-helper-text" : "password"}
              helperText={
                passwordError
                  ? "Password must be at least 8 characters, including an uppercase letter and a number"
                  : ""
              }
              value={password}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
              }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignInSide;

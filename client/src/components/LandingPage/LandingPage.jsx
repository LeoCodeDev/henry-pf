import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import background from "../../assets/images/back_landing.jpg";
import { useTheme } from "@mui/material/styles";
import { isValidEmail, isValidPassword } from "./validations";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import title from "../../assets/images/title.png";
import toast, { Toaster } from "react-hot-toast";
import GoogleLogin from "../ThirdPartyAuth/GoogleLogin";
import SignUp from "./SignUp";

function SignInSide() {
  const [formLoginVisible, setFormLoginVisible] = useState(false);
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { isLogged, authenticate } = useAuthStore();
  const [option, setOption] = useState("signin");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError(true);
      return toast.error("Email invalid!");
    }

    if (!isValidPassword(password)) {
      setPasswordError(true);
      return toast.error("Password invalid!");
    }

    try {
      await authenticate({ email, password });
    } catch (error) {
      option === "signin" && toast.error(error.message);
    }
  };

  const handleAuthentication = () => {
    if (isLogged) {
      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setTimeout(() => {
      setFormLoginVisible(true);
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
      />
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
        {option === "signin" ? (
          <Box
            sx={{
              my: 10,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: formLoginVisible
                ? "translateY(0)"
                : "translateY(-100%)",
              transition: "transform 0.5s ease-in-out",
            }}
          >
            <div
              style={{
                display: "flex",
                marginTop: "4vh",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                <LockOutlinedIcon sx={{ height: "50%", width: "50%" }} />
              </Avatar>
              <Typography
                sx={{
                  color: "white",
                  fontFamily: theme.typography.fontFamily,
                  fontSize: theme.typography.h3,
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
                backgroundColor: theme.palette.background_ligth.main,
                padding: 4,
                borderRadius: 6,
                mt: 2,
                width:"100%"
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
                autoComplete="on"
                helperText={emailError ? "Invalid email format" : ""}
                value={email}
              />
              <TextField
                error={passwordError}
                onChange={handlePasswordChange}
                required
                fullWidth
                name="password"
                label={passwordError ? "Error" : "Password"}
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="on"
                helperText={
                  passwordError
                    ? "Password must be at least 8 characters, including an uppercase letter and a number"
                    : ""
                }
                value={password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }}
              >
                Sign In
              </Button>
              <div style={{display: "flex", flexDirection: isDesktop ? "row" : "column", justifyContent:"center", gap:"0.5rem"}}>
              <GoogleLogin
                setEmail={setEmail}
                setPassword={setPassword}
                ></GoogleLogin>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/home")}
                >
                Login Guest User
              </Button>
                </div>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    onClick={() => setOption("signup")}
                    sx={{ cursor: "pointer" }}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ) : (
          <SignUp setOption={setOption} />
        )}
      </Grid>
      <Toaster position="top-center" reverseOrder={false} />
    </Grid>
  );
}

export default SignInSide;

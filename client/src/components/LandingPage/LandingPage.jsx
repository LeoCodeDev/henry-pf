import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import background from "../../assets/images/back_landing.jpg";
import { useTheme } from "@mui/material/styles";
import { isValidEmail, isValidPassword } from "./validations";

function SignInSide() {
  const [formVisible, setFormVisible] = useState(false);
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación de correo electrónico
    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }

    // Validación de contraseña
    if (!isValidPassword(password)) {
      setPasswordError(true);
      return;
    }

    // Resto del código de manejo de inicio de sesión
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Validación de correo electrónico en tiempo real
    if (!isValidEmail(newEmail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Validación de contraseña en tiempo real
    if (!isValidPassword(newPassword)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  useEffect(() => {
    // Mostrar el formulario con una pequeña demora para que la animación sea visible
    setTimeout(() => {
      setFormVisible(true);
    }, 200);
  }, []);

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
            my: 4,
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

import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import background from "../../assets/images/back_landing.jpg";
import { useTheme } from "@mui/material/styles";
import {
  isValidEmail,
  isValidPassword,
  isValidFirstName,
  isValidLastName,
  isMinimumAge,
} from "./validations";
import SelectLabels from "./DevOption";
import toast, { Toaster } from "react-hot-toast";
import AvatarSelection from "./AvatarSelection";
import { avatars } from "./avatars";

export default function SignUp() {
  const [formVisible, setFormVisible] = useState(false);
  const theme = useTheme();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    birthday: false,
  });

  const [isDeveloper, setIsDeveloper] = useState("Yes");
  const [developerType, setDeveloperType] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  useEffect(() => {
    if (isDeveloper === "No") setDeveloperType("");
  }, [isDeveloper, developerType]);

  const handleIsDeveloperChange = (value) => {
    setIsDeveloper(value);
  };

  const handleDeveloperTypeChange = (value) => {
    setDeveloperType(value);
  };

  const handleAvatarChange = (value) => {
    setSelectedAvatar(value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    switch (name) {
      case "firstName":
        setFormErrors({
          ...formErrors,
          firstName: !isValidFirstName(newValue),
        });
        break;
      case "lastName":
        setFormErrors({
          ...formErrors,
          lastName: !isValidLastName(newValue),
        });
        break;
      case "email":
        setFormErrors({
          ...formErrors,
          email: !isValidEmail(newValue),
        });
        break;
      case "password":
        setFormErrors({
          ...formErrors,
          password: !isValidPassword(newValue),
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidFirstName(formData.firstName)) {
      setFormErrors({ ...formErrors, firstName: true });
      return;
    }

    if (!isValidLastName(formData.lastName)) {
      setFormErrors({ ...formErrors, lastName: true });
      return;
    }

    if (!isValidEmail(formData.email)) {
      setFormErrors({ ...formErrors, email: true });
      return;
    }

    if (!isValidPassword(formData.password)) {
      setFormErrors({ ...formErrors, password: true });
      return;
    }

    if (!isMinimumAge(formData.birthday)) {
      return toast.error("You must be at least 12 years old to register.");
    }

    if (isDeveloper === "Yes" && developerType === "") {
      return toast.error("Choose a team of developers");
    }

    if (!selectedAvatar) {
      return toast.error("Choose a avatar");
    }

    toast.success("User created successfully!");
    console.log(
      formData,
      formData.birthday,
      isDeveloper,
      developerType,
      selectedAvatar
    );
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
          <div style={{ display: "flex" }}>
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
              Sign up
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
              marginTop: 4,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={formErrors.firstName}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id={
                    formErrors.firstName
                      ? "outlined-error-helper-text"
                      : "firstName"
                  }
                  label={formErrors.firstName ? "Error" : "First Name"}
                  value={formData.firstName}
                  onChange={handleChange}
                  helperText={formErrors.firstName ? "Invalid first name" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id={
                    formErrors.lastName
                      ? "outlined-error-helper-text"
                      : "lastName"
                  }
                  label={formErrors.lastName ? "Error" : "Last Name"}
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={formErrors.lastName}
                  helperText={formErrors.lastName ? "Invalid last name" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={formErrors.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                  fullWidth
                  id={formErrors.email ? "outlined-error-helper-text" : "email"}
                  label={formErrors.email ? "Error" : "Email Address"}
                  name="email"
                  autoComplete="email"
                  helperText={formErrors.email ? "Invalid email format" : ""}
                  value={formData.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={formErrors.password ? "Error" : "Password"}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={formErrors.password}
                  helperText={
                    formErrors.password
                      ? "Password must be at least 8 characters, including an uppercase letter and a number"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} mt={1}>
                <SelectLabels
                  isDesktop={isDesktop}
                  isDeveloper={isDeveloper}
                  developerType={developerType}
                  onIsDeveloperChange={handleIsDeveloperChange}
                  onDeveloperTypeChange={handleDeveloperTypeChange}
                />
              </Grid>
              <Grid item xs={12}>
                <AvatarSelection
                  avatars={avatars}
                  onChange={handleAvatarChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Grid>
              <Link href="/" variant="body2" style={{ marginLeft: "auto" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Toaster position="top-center" reverseOrder={false} />
    </Grid>
  );
}

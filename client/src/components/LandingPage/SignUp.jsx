import React, { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import {
  Button,
  TextField,
  Link,
  Box,
  Grid,
  Avatar,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  isValidEmail,
  isValidPassword,
  isValidFirstName,
  isValidLastName,
  isMinimumAge,
  isValidNickName,
} from "./validations";
import SelectLabels from "./DevOption";
import toast, { Toaster } from "react-hot-toast";
import AvatarSelection from "./AvatarSelection";
import { avatars } from "./avatars";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function SignUp({ setOption }) {
  const [formVisible, setFormVisible] = useState(false);
  const theme = useTheme();
  const [selectedRole, setSelectedRole] = useState("User");
  const navigate = useNavigate();
  const { authenticate } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "",
    nickName: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    birthday: false,
    nickName: false,
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

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
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
      case "nickName":
        setFormErrors({
          ...formErrors,
          nickName: !isValidNickName(newValue),
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidFirstName(formData.firstName)) {
      setFormErrors({ ...formErrors, firstName: true });
      return toast.error("Choose a valid FirstName");
    }

    if (!isValidLastName(formData.lastName)) {
      setFormErrors({ ...formErrors, lastName: true });
      return toast.error("Choose a valid LastName");
    }

    if (!isValidEmail(formData.email)) {
      setFormErrors({ ...formErrors, email: true });
      return toast.error("Choose a valid email");
    }

    if (!isValidPassword(formData.password)) {
      setFormErrors({ ...formErrors, password: true });
      return toast.error("Choose a valid password");
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

    if (!isValidNickName(formData.nickName)) {
      setFormErrors({ ...formErrors, nickName: true });
      return toast.error("Choose a valid Nick");
    }

    try {
      const dataToSend = {
        username: formData.nickName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
        birth_date: formData.birthday,
        email: formData.email,
        avatar: selectedAvatar,
        role: selectedRole,
        team: developerType,
      };

      await axios.post("/postUser", dataToSend);
      toast.success("User created successfully!");
      try {
        await authenticate({
          email: formData.email,
          password: formData.password,
        });
      } catch (error) {
        toast.error("Authentication Error!");
      }
    } catch (error) {
      toast.error("Authentication Error!");
    }
  };

  // const handleAuthentication = () => {
  //   if (isLogged) {
  //     // navigate("/home");
  //   }
  // };

  // useEffect(() => {
  //   if (isLogged) {
  //     // handleAuthentication();
  //   }
  // }, [isLogged]);

  useEffect(() => {
    setTimeout(() => {
      setFormVisible(true);
    }, 200);
  }, []);

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    // <Grid
    //   container
    //   component="main"
    //   sx={{ height: "100vh", display: "flex", flexDirection: "row-reverse" }}
    // >
    //   <CssBaseline />
    // <Grid
    //   item
    //   xs={12}
    //   sm={8}
    //   md={5}
    //   component={Paper}
    //   elevation={6}
    //   square
    //   sx={{
    //     backgroundColor: theme.palette.background.main,
    //   }}
    // >
    <Box
      sx={{
        // my: 0,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: formVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.5s ease-in-out",
      }}
    >
      <div style={{ display: "flex", padding: "1vh" }}>
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            mr: 2,
            width: 30,
            height: 30,
          }}
        ></Avatar>
        <Typography
          component="h5"
          variant="h5"
          sx={{
            color: "white",
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.h3,
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
          padding: 2,
          borderRadius: 6,
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
              helperText={
                formErrors.firstName
                  ? "Must be at least two characters without numbers"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id={
                formErrors.lastName ? "outlined-error-helper-text" : "lastName"
              }
              label={formErrors.lastName ? "Error" : "Last Name"}
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              error={formErrors.lastName}
              helperText={
                formErrors.lastName
                  ? "Must be at least two characters without numbers"
                  : ""
              }
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
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: isDesktop ? "row" : "column",
              justifyContent: "space-between",
            }}
          >
            <TextField
              style={{ width: "auto" }}
              error={formErrors.nickName}
              name="nickName"
              required
              fullWidth
              id={
                formErrors.nickName ? "outlined-error-helper-text" : "nickName"
              }
              label={formErrors.nickName ? "Error" : "Nick Name"}
              value={formData.nickName}
              onChange={handleChange}
              helperText={formErrors.nickName ? "Invalid nickName" : ""}
            />
            <AvatarSelection
              isDesktop={isDesktop}
              avatars={avatars}
              onChange={handleAvatarChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel id="demo-controlled-radio-buttons-group">
                Role
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={selectedRole}
                onChange={handleRoleChange}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="User"
                  control={<Radio />}
                  label="User"
                />
                <FormControlLabel
                  value="Trainer"
                  disabled={true}
                  control={<Radio />}
                  sx={{ cursor: "pointer", marginLeft:"auto"}}
                  label="Trainer"
                />
              </RadioGroup>
            </FormControl>
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

          <Link
            onClick={() => setOption("signin")}
            sx={{ cursor: "pointer" }}
            variant="body2"
          >
            {"Already have an account? Sign in"}
          </Link>
        </Grid>
      </Box>
    </Box>
  );
}

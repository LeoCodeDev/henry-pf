import React, { useState, useEffect } from "react";
import {
  Typography,
  useMediaQuery,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Link,
} from "@mui/material";
import {
  isValidEmail,
  isValidPassword,
  isValidFirstName,
  isValidLastName,
  isMinimumAge,
  isValidNickName,
} from "../LandingPage/validations";
import SelectLabels from "../LandingPage/DevOption";
import toast, { Toaster } from "react-hot-toast";
import AvatarSelection from "../LandingPage/AvatarSelection";
import { avatars } from "../LandingPage/avatars";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import theme from "../../../theme";

export default function CompleteRegister({ email, firstName, lastName }) {
  const [selectedRole, setSelectedRole] = useState("User");
  const navigate = useNavigate();
  const { isLogged, authenticate } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    password: "",
    birthday: "",
    nickName: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    password: false,
    birthday: false,
    nickName: false,
  });

  const [isDeveloper, setIsDeveloper] = useState("Yes");
  const [developerType, setDeveloperType] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

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
      return;
    }

    if (!isValidLastName(formData.lastName)) {
      setFormErrors({ ...formErrors, lastName: true });
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
      return toast.error("Choose an avatar");
    }

    if (!isValidNickName(formData.nickName)) {
      setFormErrors({ ...formErrors, nickName: true });
      return;
    }
    try {
      const dataToSend = {
        email: formData.email,
        username: formData.nickName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
        birth_date: formData.birthday,
        avatar: selectedAvatar,
        role: selectedRole,
        team: developerType,
      };

      await axios.post("/postUser", dataToSend);
      toast.success("User created successfully!");

      try {
        await authenticate({
          email: email,
          password: formData.password,
        });
      } catch (error) {
        console.error("Error:", error.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
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

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <div
      style={{
        minHeight: "100vh",
        maxHeight: "80vh",
        backgroundColor: theme.palette.background.main,
        padding: "2vh",
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={
          {
            // backgroundColor: theme.palette.background.main,
          }
        }
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: theme.palette.background_ligth.main,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            padding: 4,
            borderRadius: 6,
            marginTop: 1,
            minWidth: "90vh",
            // width: isDessktop ? "40%" : "70%",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{ color: theme.palette.primary.main }}
            style={{
              fontSize: isDesktop ? "24px" : "18px",
              textAlign: "center",
              marginTop: "-3vh",
              marginBottom: "-1vh",
              padding: "1vh",
            }}
          >
            Please, complete your profile:
          </Typography>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              value={email}
              disabled={true}
              autoComplete="username"
              sx={{
                cursor: "not-allowed",
              }}
            />
          </Grid>
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
                justifyContent: "space-around",
              }}
            >
              <TextField
                style={{ width: "auto" }}
                error={formErrors.nickName}
                name="nickName"
                required
                fullWidth
                id={
                  formErrors.nickName
                    ? "outlined-error-helper-text"
                    : "nickName"
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
                    control={<Radio />}
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
                Complete Profile
              </Button>
            </Grid>
            <Link href="/" variant="body2" style={{ marginLeft: "auto" }}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Box>
      </Grid>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

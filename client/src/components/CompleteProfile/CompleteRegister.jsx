import { useEffect, useState } from "react";
import {
  Typography,
  useMediaQuery,
  Button,
  TextField,
  Box,
  Grid,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  isValidPassword,
  isValidFirstName,
  isValidLastName,
  isMinimumAge,
  isValidNickName,
} from "../LandingPage/validations";
import SelectLabels from "../LandingPage/DevOption";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import theme from "../../../theme";
import emailSender from "../SendMail/SendMail";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function CompleteRegister({
  email,
  firstName,
  lastName,
  profilePic,
  setPassword,
}) {
  const [selectedRole, setSelectedRole] = useState("User");
  const { authenticate } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formDataG, setformDataG] = useState({
    email: email,
    firstName: firstName,
    lastName: lastName,
    avatar: profilePic,
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
  const [registered, setRegistered] = useState(false);

  const handleIsDeveloperChange = (value) => {
    setIsDeveloper(value);
  };

  const handleDeveloperTypeChange = (value) => {
    setDeveloperType(value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value;

    setformDataG({
      ...formDataG,
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

    if (!isValidFirstName(formDataG.firstName)) {
      setFormErrors({ ...formErrors, firstName: true });
      return;
    }

    if (!isValidLastName(formDataG.lastName)) {
      setFormErrors({ ...formErrors, lastName: true });
      return;
    }

    if (!isValidPassword(formDataG.password)) {
      setFormErrors({ ...formErrors, password: true });
      return;
    }

    if (!isMinimumAge(formDataG.birthday)) {
      return toast.error("You must be at least 12 years old to register.");
    }

    if (isDeveloper === "Yes" && developerType === "") {
      return toast.error("Choose a team of developers");
    }

    if (!isValidNickName(formDataG.nickName)) {
      setFormErrors({ ...formErrors, nickName: true });
      return toast.error("Choose a Nick valid");
    }

    setPassword(formDataG.password);

    const dataToSend = {
      username: formDataG.nickName,
      first_name: formDataG.firstName,
      last_name: formDataG.lastName,
      password: formDataG.password,
      birth_date: formDataG.birthday,
      email,
      avatar: profilePic,
      role: selectedRole,
      team: developerType,
    };

    try {
      await axios.post("/users/postUser", dataToSend);
      const title = "Thank you for signing up for Healthech!";
      const message =
        "Thank you for signing up for Healtech! We're excited to have you as part of our community. If you have any questions or need assistance, please don't hesitate to contact us. We hope you enjoy your experience with Healtech!";
      emailSender(email, title, message);
      toast.success("User created successfully!");
      setRegistered(true);
    } catch (error) {
      return toast.error("Error creating user");
    }
  };

  useEffect(() => {
    if (registered) {
      authenticate({
        email: email,
        password: formDataG.password,
      });
    }
  }, [registered]);

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <div>
      <Grid
        sx={{
          display: "flex",
          padding: 8,
          width: "100%",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: theme.palette.background_ligth.main,
            width: "50vw",
          }}
        >
          <Typography
            variant="h5"
            color="primary"
          >
            Please, complete your profile:
          </Typography>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="email"
              value={email}
              disabled={true}
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
                value={formDataG.firstName}
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
                value={formDataG.lastName}
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
                type={showPassword ? "text" : "password"} 
                id="password"
                autoComplete="new-password"
                value={formDataG.password}
                onChange={handleChange}
                error={formErrors.password}
                helperText={
                  formErrors.password
                    ? "Password must be at least 8 characters, including an uppercase letter and a number"
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
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
                value={formDataG.nickName}
                onChange={handleChange}
                helperText={formErrors.nickName ? "Invalid nickName" : ""}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <TextField
                id="date"
                label="Birthday"
                type="date"
                name="birthday"
                value={formDataG.birthday}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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
                flexDirection: "row-reverse",
                justifyContent: "center",
                gap: "20vh",
              }}
            >
              <img
                src={profilePic}
                style={{
                  borderRadius: "50%",
                  border: `2px groove ${theme.palette.primary.main}`,
                }}
              ></img>

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
                    label="Trainer"
                    type="string"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: -4 }}
              >
                Complete Profile
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}

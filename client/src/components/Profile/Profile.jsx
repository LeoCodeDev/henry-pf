import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { ThemeProvider } from "@mui/system";
import theme from "../../../theme";
import { useAuthStore } from "../../store/authStore";

export default function Profile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [imagen, setImagen] = useState(user.avatar);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
  });
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(""); // Estado para almacenar el equipo seleccionado

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value); // Actualiza el estado con el equipo seleccionado
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/getTeams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud GET:", error);
      });
  }, []);

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const response = await axios.get("/getUser", {
          params: {
            email: user.email,
          },
        });
        const userData = response.data;

        setFormData({
          firstName: userData.first_name || "",
          lastName: userData.last_name || "",
          nickName: userData.username || "",
          team: userData.Team?.name || "",
          avatar: userData.avatar,
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    handleGetUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (event) => {
    if (event.target.files.length > 0) {
      const originalFileName = event.target.files[0].name;
      const fileNameWithUnderscores = originalFileName.replace(/ /g, "_");
      setImagen(fileNameWithUnderscores);
    }
    // Resto del manejo de la carga de la imagen aquí
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleImageUpload();
    formData.avatar = imagen;
    formData.team = selectedTeam;
    console.log("Datos a enviar al backend:", formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          marginTop: "12vh",
        }}
      >
        <Paper
          elevation={8}
          sx={{ padding: "20px", minWidth: "50%", borderRadius: "8px" }}
        >
          <Typography variant="h5" color="primary" gutterBottom>
            User Profile
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isEditing}
                onChange={() => setIsEditing(!isEditing)}
                name="isEditing"
              />
            }
            label={isEditing ? "Edit on" : "Edit off"}
          />
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              type="text"
              name="firstName"
              label="First Name"
              variant="outlined"
              size="small"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              type="text"
              name="lastName"
              label="Last Name"
              variant="outlined"
              size="small"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              type="text"
              name="nickName"
              label="Nick Name"
              variant="outlined"
              size="small"
              value={formData.nickName}
              onChange={handleInputChange}
              disabled={!isEditing}
              sx={{ marginBottom: "16px" }}
            />
            {/* <div> */}
            <Select
              label="Team"
              variant="standard"
              value={selectedTeam || formData?.team || ""}
              onChange={handleTeamChange}
              size="small"
              fullWidth
              sx={{ marginBottom: "16px" }}
              disabled={!isEditing}
            >
              {teams?.map((team, key) => (
                <MenuItem key={key} value={team.name}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                flexDirection:"column",
                // marginBlock: "0.5rem",
              }}
            >
              <img
                src={formData.avatar || user.avatar}
                style={{
                  minWidth: "150px",
                  border: `2px solid ${theme.palette.primary.main}`,
                  filter: !isEditing ? "grayscale(100%)" : "grayscale(0%)",
                  marginBottom: "0.5rem"
                }}
                alt="Avatar"
              />
              <label htmlFor="avatar">
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={handleImageUpload}
                  accept="image/png, image/jpeg"
                  disabled={!isEditing}
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    padding: "4px 8px", 
                    cursor: "pointer",
                    borderRadius: "4px",
                    fontSize: "12px",
                    marginBottom: "0.5rem"
                  }}
                  disabled={!isEditing}
                >
                  Upload image
                </Button>
              </label>
            </div>
            {isEditing && (
              <>
              <hr style={{border:"solid 1px lightgray", margin:"0.1rem"}}></hr>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                >
                Submit
              </Button>
            </>
            )}
          </form>
        </Paper>
        </Container>
        </ThemeProvider>
        );
}

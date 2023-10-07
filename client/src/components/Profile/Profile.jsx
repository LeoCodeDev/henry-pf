import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

// Firebase
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Importa react-hot-toast
import toast, { Toaster } from "react-hot-toast";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "login-d4c6e.firebaseapp.com",
  projectId: "login-d4c6e",
  storageBucket: "login-d4c6e.appspot.com",
  messagingSenderId: "455379913119",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function Profile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [imagen, setImagen] = useState(user.avatar);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    avatar: null,
  });
  const [teams, setTeams] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const navigate = useNavigate();
  let downloadURL = "";

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value); // Actualiza el estado con el equipo seleccionado
    setHasChanges(true); // bandera para saber que si hubo cambio
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/getTeams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("Error when making GET request:", error);
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
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          username: userData.username || "",
          team: userData.Team?.name || "",
          avatar: userData.avatar,
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    handleGetUser();
  }, [user.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setHasChanges(true);
  };

  const handleImageUpload = (event) => {
    if (event.target.files.length > 0) {
      const originalFileName = event.target.files[0].name;
      const fileNameWithUnderscores = originalFileName.replace(/ /g, "_");
      setImagen(fileNameWithUnderscores);

      // Almacena la imagen seleccionada en el estado formData
      setFormData({
        ...formData,
        avatar: event.target.files[0],
      });

      setHasChanges(true); // bandera para saber que si hubo cambio

      // Actualiza la imagen en tiempo real en el elemento img. Almaceno la imagen en el buffer
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageURL(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handlePostData = async () => {
    try {
      if (!hasChanges) {
        // Muestra una alerta en lugar de enviar el formulario
        toast("You haven't made any changes", {
          icon: "🤔",
        });
        return;
      }

      // Verifica si hay una imagen seleccionada y si es diferente de "undefined"
      if (formData.avatar && formData.avatar.name !== undefined) {
        const storageRef = ref(
          storage,
          `images/profile/${user.username}/${formData.avatar.name}`
        );
        await uploadBytes(storageRef, formData.avatar);

        // Obtiene la URL de la imagen cargada
        downloadURL = await getDownloadURL(storageRef);

        formData.avatar = downloadURL;
      } else {
        // Si no hay una imagen seleccionada o es "undefined", conserva la imagen existente
        formData.avatar = user.avatar;
      }

      formData.email = user.email;
      formData.team = selectedTeam;

      // Realiza la solicitud al servidor para actualizar los datos del usuario
      await axios.put("/putUser", formData);

      // Muestra una notificación de éxito
      toast.success("User updated successfully");
      formData.avatar && (user.avatar = formData.avatar);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      if (error.response.status === 400) {
        // Muestra una notificación de error
        toast.error("Username already exists");
        formData.avatar = imagen;
        return;
      }
      console.error("Error in sending data:", error);
    }
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
          <form style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              type="text"
              name="first_name"
              label="First Name"
              variant="outlined"
              size="small"
              value={formData.first_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              type="text"
              name="last_name"
              label="Last Name"
              variant="outlined"
              size="small"
              value={formData.last_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              type="text"
              name="username"
              label="Username"
              variant="outlined"
              size="small"
              value={formData.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              sx={{ marginBottom: "16px" }}
            />
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
                flexDirection: "column",
              }}
            >
              <img
                src={imageURL ? imageURL : user.avatar}
                style={{
                  minWidth: "150px",
                  maxWidth: "150px",
                  height: "auto",
                  border: `2px solid ${theme.palette.primary.main}`,
                  filter: !isEditing ? "grayscale(100%)" : "grayscale(0%)",
                  marginBottom: "0.2rem",
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
                    cursor: "pointer",
                    borderRadius: "4px",
                    fontSize: "12px",
                    marginBottom: "1rem",
                  }}
                  disabled={!isEditing}
                >
                  Upload image
                </Button>
              </label>
            </div>
            {isEditing && (
              <>
                <hr
                  style={{ border: "solid 1px lightgray", margin: "0.1rem" }}
                />
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handlePostData} // Envia los datos al servidor
                >
                  Submit
                </Button>
              </>
            )}
          </form>
        </Paper>
      </Container>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}

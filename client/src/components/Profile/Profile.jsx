import { useState, useEffect } from "react";
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
  Grid,
} from "@mui/material";
import axios from "axios";
import { ThemeProvider } from "@mui/system";
import theme from "../../../theme";
import { useAuthStore } from "../../store/authStore";
import guest from "../../assets/images/avatars/avatar10.jpg";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

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

export default function Profile({onlyEdit}) {
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
  const [activitySale, setActivitySale] = useState(null);
  const [activityReview, setActivityReview] = useState(null);
  const navigate = useNavigate();
  let downloadURL = "";

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value); 
    setHasChanges(true); // bandera para saber que si hubo cambio
  };

  useEffect(() => {
    handleGetSales();
    axios
      .get("/users/getTeams")
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
        if (!user.email) return
        const response = await axios.get("/users/getUser", {
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
      await axios.put("/users/putUser", formData);

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

  const handleDisable = () => {
    if (user.email !== "") {
      setIsEditing(!isEditing);
    } else {
      toast.error("Cannot edit guest user");
    }
  };
  const handleGetSales = async () => {
    try {
      if (!user.id_user) return
      const { data } = await axios(
        `sales/getUserSales?id_user=${user.id_user}`
      );

      data.sort((a, b) => new Date(b.date) - new Date(a.date));

      const lastDataSale = data.slice(0, 3).map((registro) => {
        const product = registro.Products[0];
        const quantity = Math.round(registro.total / parseFloat(product.price));
        return {
          date: registro.date.split("T")[0],
          product: product.name,
          quantity: quantity,
          total: registro.total,
        };
      });
      setActivitySale(lastDataSale);

      const secondData = await axios("/dashboard/getUserRating", {
        params: {
          email: user.email,
        },
      });
      const rawData = secondData.data.slice(0, 3);
      
      // Voy a traer sólo los comentarios activos
      const filteredData = rawData
        .filter((element) => element.active === true)
        .map((element) => ({
          date: element.updatedAt.split("T")[0],
          comment: element.comment,
          rating: element.rating,
          productName: element.Product.name,
        }));

      setActivityReview(filteredData);
    } catch (error) {
      console.error("Error en las solicitudes GET:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={!onlyEdit ? 8 : 12}>
            <Paper elevation={8} sx={{ padding: "20px", borderRadius: "8px" }}>
              <Typography variant="h5" color="primary" gutterBottom>
                User Profile
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={isEditing}
                    onChange={handleDisable}
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
                />
                <Select
                  label="Team"
                  variant="standard"
                  value={selectedTeam || formData?.team || ""}
                  onChange={handleTeamChange}
                  size="small"
                  fullWidth
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
                    src={
                      imageURL
                        ? imageURL
                        : user.email == ""
                        ? guest
                        : user.avatar
                    }
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
                      style={{
                        border: "solid 1px lightgray",
                        margin: "0.1rem",
                      }}
                    />
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={handlePostData}
                    >
                      Submit
                    </Button>
                  </>
                )}
              </form>
            </Paper>
          </Grid>
         {!onlyEdit && <Grid item xs={12} md={4}>
            <Paper
              elevation={8}
              sx={{ padding: "20px", borderRadius: "8px", minWidth: "30vw" }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Last activity
              </Typography>
              <hr color="primary"></hr>
              <div style={{ marginTop: "2rem" }}>
                <Typography variant="h7" color="primary" >
                  Purchases:
                </Typography>
                {activitySale && activitySale.length > 0 ? (
                  <div>
                    {activitySale.map((sale, index) => (
                      <Typography color="black" fontSize={12} key={index} sx={{padding:"0.5rem"}}>
                      {`🛒 ${sale.quantity} ${sale.product} for $${sale.total} (${sale.date})`}
                      </Typography>
                    ))}
                  </div>
                ) : (
                  <p>No purchase activity.</p>
                )}
              </div>
              <div style={{ marginTop: "2rem" }}>
                <Typography variant="h7" color="primary">
                  Reviews:
                </Typography>
                {activityReview && activityReview.length > 0 ? (
                  <div>
                    {activityReview.map((review, index) => (
                      <Typography color="black" fontSize={12} key={index} sx={{padding:"0.5rem"}}>
                      {`✍️ Rated ${review.rating}/5 for ${review.productName}: "${review.comment} (${review.date})"`}
                      </Typography>
                    ))}
                  </div>
                ) : (
                  <p>No review activity.</p>
                )}
              </div>
            </Paper>
          </Grid> 
          }
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
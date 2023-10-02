import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import CompleteProfile from "../CompletePerfil/CompleteProfile";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAkX7UHZGncJdAESnq5yTOAZ7FfRKFRHZY",
  authDomain: "login-d4c6e.firebaseapp.com",
  projectId: "login-d4c6e",
  storageBucket: "Healthech/home",
  messagingSenderId: "455379913119",
  appId: "1:455379913119:web:1a9bc146c0a713b00515aa",
};

// Inicializa Firebase
initializeApp(firebaseConfig);

function GoogleLogin() {
  // Crear una instancia de GoogleAuthProvider
  const googleAuthProvider = new GoogleAuthProvider();

  // Estado para rastrear si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Datos del usuario autenticado
  const [userData, setUserData] = useState(null);

  // Función para obtener y establecer los datos del usuario
  const fetchUserData = (user) => {
    const displayName = user.displayName;
    const nameParts = displayName.split(' '); // Dividir el nombre en partes por espacio
    const firstName = nameParts[0]; // Primer elemento
    const lastName = nameParts[nameParts.length - 1]; // Último elemento
  
    setUserData({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      firstName: firstName,
      lastName: lastName,
    });
  };
  

  // Manejar el inicio de sesión con Google
  const handleGoogleLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // El usuario se ha autenticado con éxito
        const user = result.user;
        fetchUserData(user); // Obtener y mostrar los datos del usuario
        setIsAuthenticated(true); // Actualiza el estado para indicar que el usuario está autenticado
      })
      .catch((error) => {
        // Manejar errores de inicio de sesión
        console.error("Google sign-in error:", error);
      });
  };

  // Manejar el cierre de sesión
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // El usuario ha cerrado sesión correctamente
        console.log("User logged out");
        setIsAuthenticated(false); // Actualiza el estado para indicar que el usuario no está autenticado
        setUserData(null); // Restablece los datos del usuario
      })
      .catch((error) => {
        // Manejar errores de cierre de sesión
        console.error("Logout error:", error);
      });
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          {/* <p>¡Has iniciado sesión como {userData.displayName}!</p>
          <img src={userData.photoURL} alt="Foto de perfil" />
          <p>Correo electrónico: {userData.email}</p> */}
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
      )}
      {isAuthenticated &&  <CompleteProfile
    email={userData.email}
    firstName={userData.firstName}
    lastName={userData.lastName}
  />}
    </div>
  );
}

export default GoogleLogin;

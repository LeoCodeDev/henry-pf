import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import CompleteProfile from "../CompleteProfile/CompleteProfile";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "login-d4c6e.firebaseapp.com",
  projectId: "login-d4c6e",
  storageBucket: "login-d4c6e.appspot.com",
  messagingSenderId: "455379913119",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa Firebase
initializeApp(firebaseConfig);

function GoogleLogin({setEmail, setPassword}) {
  // Crear una instancia de GoogleAuthProvider
  const googleAuthProvider = new GoogleAuthProvider();

  googleAuthProvider.setCustomParameters({
    prompt: 'select_account', // Esto forzará el selector de cuentas
  });
  // Estado para rastrear si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Datos del usuario autenticado
  const [userData, setUserData] = useState(null);


  
  // Función para obtener y establecer los datos del usuario
  const fetchUserData = (user) => {
    const displayName = user.displayName;
    const nameParts = displayName.split(" "); // Dividir el nombre en partes por espacio
    const firstName = nameParts[0]; // Primer elemento
    const lastName = nameParts[nameParts.length - 1]; // Último elemento

    setEmail(user.email);
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
        const user = result.user;
        fetchUserData(user); // Obtener y mostrar los datos del usuario
        setIsAuthenticated(true); // Actualiza el estado para indicar que el usuario está autenticado
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
      });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false); 
        setUserData(null);
      })
      .catch((error) => {
        toast.error("Logout Error!");
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
            Logout Google
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
      {isAuthenticated && (
        <CompleteProfile
          setPassword={setPassword}
          email={userData.email}
          firstName={userData.firstName}
          lastName={userData.lastName}
          profilePic={userData.photoURL}
        />
      )}
    </div>
  );
}

export default GoogleLogin;

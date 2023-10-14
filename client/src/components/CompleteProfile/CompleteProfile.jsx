import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { CircularProgress, Dialog, Button } from "@mui/material";
import CompleteRegister from "./CompleteRegister";

function CompleteProfile({
  email,
  firstName,
  lastName,
  profilePic,
  setPassword
}) {
  const { authenticate } = useAuthStore();
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(false);
  const [register, setRegister] = useState(false);

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const response = await axios.get("/users/getUser", {
          params: {
            email: email,
          },
        });
        const data = response.data;
        setUser(data);
        setProgress(true);
      } catch (error) {
        setProgress(true);
        if (error.request.status === 404) {
          setTimeout(() => {
            setRegister(true);
          }, 500);
        }
      }
    };
    
    handleGetUser();
  }, [email]);
  
  const handleAuthenticate = async (email, password) => {
    try {
      await authenticate({ email, password });
    } catch (error) {
      console.error("Authentication Error");
    }
  };

  useEffect(() => {
    if (user) {
      const email = user.email;
      const password = user.password;
      handleAuthenticate(email, password);
    }
  }, [user]);

  return (
    <div>
      {!progress && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {register && (
        <>
          <Dialog
            open={true}
            maxWidth="md"
          >
            <Button
              onClick={() => setRegister(false)}
              className="custom-close-button"
              style={{
                fontFamily: "poppins, arial",
                position: "absolute",
                backgroundColor: "red",
                color: "white",
                maxWidth: "100px",
                right: "0",
                margin: "2vh",
              }}
            >
              Close
            </Button>
            <CompleteRegister
              setPassword={setPassword}
              email={email}
              firstName={firstName}
              lastName={lastName}
              profilePic={profilePic}
            />
          </Dialog>
        </>
      )}
    </div>
  );
}

export default CompleteProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Dialog, DialogTitle, Button } from "@mui/material";
import CompleteRegister from "./CompleteRegister";

function CompleteProfile({ email, firstName, lastName, profilePic, setLoc }) {
  const { isLogged, authenticate } = useAuthStore();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(false);
  const [register, setRegister] = useState(false);

  useEffect(() => {
    setLoc("google");
  }, [])

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const response = await axios.get("/getUser", {
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
      console.log(email, password);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      const email = user.email;
      const password = user.password;
      handleAuthenticate(email, password);
    }
  }, [user]);

  useEffect(() => {
    if (isLogged) {
      navigate("/home");
    }
  }, [isLogged]);

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
            // fullWidth
            maxWidth="md"
            // style={{ minHeight: "80vh" }}
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
            <CompleteRegister email={email} firstName={firstName} lastName={lastName} profilePic={profilePic} />
          </Dialog>
        </>
      )}
    </div>
  );
}

export default CompleteProfile;

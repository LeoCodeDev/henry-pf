import { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import CardRoutine from "../CardRoutine.jsx/CardRoutine";
import axios from "axios";
import theme from "../../../theme";

const TrainerProfile = ({ selectedTrainer }) => {
  const [routines, setRoutines] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios(
          `/users/getTrainerRoutines?trainer_id=${selectedTrainer.id_user}`
        );
        setRoutines(data);
      })();
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedTrainer]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios(
          `/users/getTrainerReview?trainer_id=${selectedTrainer.id_user}`
        );
        setReviews(data);
      })();
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedTrainer]);

  return (
    <Grid sx={{ marginLeft: "10rem" }} item xs={12} md={8}>
      <div style={{ textAlign: "center", marginLeft: "10rem", marginTop:"10rem" }}>
        <Typography variant="h4">{selectedTrainer.userName}</Typography>
        <img
          src={selectedTrainer.avatar}
          alt={`${selectedTrainer.username} profile picture`}
          style={{ width: "10rem", height: "10rem", borderRadius:"8px" }}
        />
        <div style={{ textAlign: "left" }}>
          <Typography>Puntuation: {`⭐ ${selectedTrainer.avgRating.toFixed(1)}`}</Typography>
          <div>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
              }}
            >
              Suscribe
            </Button>
          </div>
        </div>
      </div>
      <Grid container spacing={2}>
        {routines.map((routine) => (
          <Grid item xs={12} sm={6} md={4} key={routine.id_routine}>
            <CardRoutine routine={routine} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export { TrainerProfile };

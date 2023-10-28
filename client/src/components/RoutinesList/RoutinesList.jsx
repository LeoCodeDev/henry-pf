import axios from "axios";
import { useEffect, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import CardRoutine from "../CardRoutine.jsx/CardRoutine";
import { NavBar } from "../NavBar/NavBar";
import { Grid, Button, Typography } from "@mui/material/";
import { TrainerProfile } from "./TrainerProfile";
import theme from "../../../theme";

export default function RoutineList() {
  const [routines, setRoutines] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const sortTrainers = (a, b) => {
    if (a.avgRating < b.avgRating) {
      return 1;
    } else if (a.avgRating > b.avgRating) {
      return -1;
    } else {
      return b.countRatings - a.countRatings;
    }
  };

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios("/users/getAllTrainers");
        data && setTrainers(data.sort(sortTrainers));
      })();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    const fetchRoutines = async () => {
      const { data } = await axios.get("/routines/getAllRoutines");
      data && setRoutines(data);
    };
    fetchRoutines();
  }, []);

  const handleClick = (e) => {
    if (!selectedTrainer || selectedTrainer.id_user !== Number(e.target.id)) {
      return setSelectedTrainer(
        trainers.find((trainer) => Number(e.target.id) === trainer.id_user)
      );
    }
    setSelectedTrainer(null);
  };

  const trainerCollection = trainers.map((trainer) => {
    return (
      <div key={trainer.id_user}>
        <MenuItem>
          <figure
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={trainer.avatar}
              alt={`${trainer.username} profile picture`}
              id={trainer.id_user}
              onClick={handleClick}
            />
          </figure>
        </MenuItem>
        <SubMenu
          title={`${trainer.username} ⭐ ${trainer.avgRating.toFixed(1)}`}
        >
          <div
            style={{
              display: "flex",
              marginBlock: "1rem",
              marginInline: "1rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                marginInline: "1rem",
              }}
            >
              Suscribe
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
              }}
            >
              Routines
            </Button>
          </div>
        </SubMenu>
        <hr color="primary" width="95%"></hr>
      </div>
    );
  });

  return (
    <>
      <NavBar />
      <Grid container xs={10} marginTop={8} textAlign="center" spacing={2}>
        <Grid item md={2} position="relative">
          <ProSidebar style={{ backgroundColor: "#333", height: "100%" }}>
            <Typography sx={{fontFamily: theme.typography.fontFamily}} color="white" marginLeft={10} padding={2}>Trainers</Typography>
            <hr width="95%"></hr>
            <Menu>{trainerCollection}</Menu>
          </ProSidebar>
        </Grid>
        <Grid container xs={10}>
          <Grid item md={12}>
            {selectedTrainer ? (
              <TrainerProfile
                sx={{ marginLeft: "10rem" }}
                selectedTrainer={selectedTrainer}
              />
            ) : (
              <Grid sx={{ marginLeft: "10rem", marginTop:"5rem" }} container md={8} xs={8}>
                {routines.map((routine) => (
                  <Grid item xs={12} sm={6} md={4} key={routine.id_routine}>
                    <CardRoutine routine={routine} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

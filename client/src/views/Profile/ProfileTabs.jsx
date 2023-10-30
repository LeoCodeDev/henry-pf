import Calendar from "../../components/Calendar/Calendar";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import toast, { Toaster } from "react-hot-toast";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { ProfileSales } from "./ProfileSales";
import styles from "../../components/AdminView/Css/AdminView.module.css";
import RoutineForm from "../../components/RoutineForm/RoutineForm";



export function ProfileTabs({ sales }) {
  const [isLoading, setIsLoading] = useState({});
  const { user } = useAuthStore();
  const [userRoutines, setUserRoutines] = useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const fetchRoutinesUser = async () => {
    try {
      if(user.email === '') return
      const { data } = await axios.get(
        `routines/getUserRoutines?email=${user.email}`
      );
      setUserRoutines(data);
    } catch (error) {
      setUserRoutines([]);
    }
  };

  const deleteRoutineUser = async (id) => {
    setIsLoading((prevLoading) => ({ ...prevLoading, [id]: true }));
    try {
      await axios({
        method: "DELETE",
        url: "routines/deleteSavedRoutine",
        data: {
          email: user.email,
          id_routine: id,
        },
      });
      await fetchRoutinesUser();
      toast.success("Routine remove");
    } catch (error) {
      toast.error("Error removing routine");
    } finally {
      setIsLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
    }
  };

  useEffect(() => {
    fetchRoutinesUser();
  }, []);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    useEffect(() => {
      // Redibujar el calendario cuando se muestra la pestaña del calendario
      const calendar = document.querySelector(".fc");
      if (calendar && value === 2) {
        window.dispatchEvent(new Event("resize"));
      }
    }, [value]);
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ borderLeft: "1px solid #ccc", background: "#111" }}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} indicatorColor="secondary">
          <Tab style={{color:"white"}} label="Routines" />
          <Tab style={{color:"white"}} label="Sales" />
          <Tab style={{color:"white"}} label="Calendar" />
          <Tab style={{color:"white"}} label="Add Routine"/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{ margin: "1em" }}>
          {userRoutines.length === 0 ? (
            <Typography>
              “You haven’t added any routines yet, friend. Take a look at the{" "}
              <Link
                style={{ textDecoration: "none", color: "green" }}
                to={"/routines"}
              >
                routines
              </Link>{" "}
              we offer and enjoy your workout!”
            </Typography>
          ) : (
            userRoutines.map((routine) => (
              <Card key={routine.id_routine} style={{ margin: "1em", position: "relative" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    🏋️‍♂️ {routine.name_routine}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    👤 Author username: {routine.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    🏆 Puntuation: {routine.puntuation || "N/A"}
                  </Typography>
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "2rem",
                    }}
                  >
                    {isLoading[routine.id_routine] ? (
                      <LoadingButton loading variant="outlined">
                        Submit
                      </LoadingButton>
                    ) : (
                      <Button
                        onClick={() => deleteRoutineUser(routine.id_routine)}
                        variant="outlined"
                        color="error"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    🏋️‍♂️ Exercises: {routine?.Exercises.length}
                  </Typography>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">Exercises</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {routine.Exercises.map((exercise) => (
                        <div key={exercise.id_exercise}>
                          <Typography variant="h6">{exercise.name}</Typography>
                          <Typography variant="body2">
                            Type: {exercise.type}
                          </Typography>
                          <Typography variant="body2">
                            Muscle: {exercise.muscle}
                          </Typography>
                          <Typography variant="body2">
                            Difficulty: {exercise.difficulty}
                          </Typography>
                          <Typography variant="body2">
                            Description: {exercise.description}
                          </Typography>
                          <hr />
                        </div>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>Sales Content</Typography>

        <div
          className={styles.children}
          style={{
            display: "flex",
            flexDirection: "row",
            overflowY: "scroll",
            height: "60vh",
            flexFlow: "wrap",
            justifyContent: "space-around",
          }}
        >
          {sales.map((sale, index) => (
            <ProfileSales sale={sale} key={index} />
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>Calendar</Typography>
        <div style={{ maxWidth: "68vw" }}>
          <Calendar routines={userRoutines} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}> 
            <RoutineForm />
      </TabPanel>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

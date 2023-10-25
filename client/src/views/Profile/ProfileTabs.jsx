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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { ProfileSales } from "./ProfileSales";
import styles from "../../components/AdminView/Css/AdminView.module.css"

export function TabPanel(props) {
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

export function ProfileTabs({ sales, routines }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(sales);
  return (
    <div style={{ borderLeft: "1px solid #ccc" }}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Routines" />
          <Tab label="Sales" />
          <Tab label="Calendar" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Typography>Routines Content</Typography>
        <div style={{ margin: "1em" }}>
          {routines.map((routine, index) => (
            <Card key={index} style={{ margin: "1em" }}>
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
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>Sales Content</Typography>

        <div className={styles.children}
          style={{
            display: "flex",
            flexDirection: "row",
            overflowY: "scroll",
            height:'58vh',
            flexFlow: "wrap",
            justifyContent: "space-around"
          }}
        >
          {sales.map((sale, index) => (
            <ProfileSales sale={sale} key={index} />
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>Calendar</Typography>
        <div>
          <Calendar />
        </div>
      </TabPanel>
    </div>
  );
}
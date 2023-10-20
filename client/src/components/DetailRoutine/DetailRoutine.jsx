import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";

const DetailRoutine = () => {
  const [routine, setRoutine] = useState("");
  const [loading, setLoading] = useState(true);

  const id_routine = useParams();
  
  useEffect(() => {
        
    try {
      const getRoutine = async () => {
        const { data } = await axios.get(
          `/routines/getRoutineById?id_routine=${id_routine.id_routine}`
        );
        setRoutine(data);

        setLoading(false);
      };
      getRoutine();
    } catch (error) {
      console.log(error)
    }
  }, [id_routine]);
  

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
    <NavBar/>
    <Card
    style={{margin:'7em'}}>
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
                <Typography variant="body2">Type: {exercise.type}</Typography>
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
    </>
  );
}

export { DetailRoutine } 


import {useAuthStore} from '../../store/authStore'
import { useEffect, useState } from "react";
import { Chip,Typography,TextField, Select, MenuItem, Button, FormControl, InputLabel, Modal} from "@mui/material";
import style from "./RoutineForm.module.css";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast';

export default function RoutineForm({open, onClose}) {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises]=useState([])
  const [routineName, setRoutineName]=useState("")
  const {user}=useAuthStore()

  const getExercises = async () => {
    const {data}= await axios.get('/exercises/getExercises')
    setExercises(data)
  }
  console.log(exercises)

  const handleNameRoutineChange = (e) => {
    setRoutineName(e.target.value);
  };

  const handleExerciseAdd = (event) => {
    setSelectedExercises(event.target.value)
  };

  const handleDeleteExercise=(id)=>{
    setSelectedExercises(selectedExercises.filter(exercise=>exercise.id_exercise!==id))
  }

  const handleFormSubmit = async (e) => {
    const dataToSend= {
      email:user.email,
      name_routine: routineName,
      exercises: selectedExercises,
      puntuation:0
    }
    e.preventDefault();
    if (
      routineName.trim() === "" ||
      selectedExercises.length === 0
    ) {
      toast.error("Por favor, complete todos los campos antes de enviar la rutina.");
      return;
    }

    try {
      const response = await axios.post("/routines/postRoutine",dataToSend);

      if (response.status === 200) {
        console.log("Solicitud exitosa:", response.data);
        toast.success("¡Tu rutina ha sido creada exitosamente!");
        setRoutineName("");
        setExercises([]);
        setSelectedExercises([])
      } else {
        toast.error("Error en la respuesta del servidor. Código de respuesta:", response.status);
      }
    } catch (error) {
      toast.error("Error al enviar la solicitud:", error);
    }
  };

  useEffect(() => {
    getExercises()
  }, [])

  return (
    <Modal open={open} onClose={onClose}>
    <div className={style.container}>
      <h1>Agregar rutina</h1>
      <form noValidate autoComplete="off">
        <TextField
          id="routineName"
          label="Nombre de la Rutina"
          value={routineName}
          onChange={handleNameRoutineChange}
        />
        <FormControl fullWidth>
        <InputLabel>Select Exercises</InputLabel>
            <Select
              sx={{
                fieldset: { borderColor: "#fff" },
                padding: "0px",
                "& .MuiSelect-select": { color: "#fff" },
              }}
              multiple
              value={selectedExercises}
              onChange={handleExerciseAdd}
              renderValue={(selected) => selected.join(", ")}
            >
              {exercises.map((exercise) => (
                <MenuItem style={{color:'black'}}key={exercise.id_exercise} value={exercise}>
                  {exercise.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      <div>
        <Typography variant="h6">Selected exercises:</Typography>
            {selectedExercises?.map((exercise) => (
                <Chip
                  key={exercise.id_exercise}
                  label={exercise.name}
                  onDelete={() => handleDeleteExercise(exercise.id_exercise)}
                  style={{ margin: "4px", color: "#fff" }}
                />
              ))}
      </div>
        

        <Button variant="contained" onClick={handleFormSubmit}>
          Crear rutina
        </Button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
    </Modal>
  );
}

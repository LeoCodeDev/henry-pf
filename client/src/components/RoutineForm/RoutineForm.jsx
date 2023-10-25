


import { useState } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";
import style from "./RoutineForm.module.css";
import axios from "axios";

export default function RoutineForm({ user }) {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  const [exerciseMuscle, setExerciseMuscle] = useState("");
  const [exerciseDifficulty, setExerciseDifficulty] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");

  const exerciseTypes = [
    "cardio",
    "olympic_weightlifting",
    "plyometrics",
    "powerlifting",
    "strength",
    "stretching",
    "strongman",
  ];
  const muscleTypes = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
    "shoulders",
  ];
  const difficultyLevels = ["beginner", "intermediate", "expert"];
  const ratings = [1, 2, 3, 4, 5];

  const [formData, setFormData] = useState({
    email: user.email,
    name_routine: "",
    exercises: [],
    puntuation: "",
  });

  const [rutinaCreada, setRutinaCreada] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  const handleNameRoutineChange = (e) => {
    setFormData({ ...formData, name_routine: e.target.value });
  };
  const handleRatingChange = (e) => {
    setFormData({ ...formData, puntuation: e.target.value });
  };

  const handleExerciseAdd = () => {
    let missingField = "";

    if (exerciseName.trim() === "") {
      missingField = "Nombre del Ejercicio";
    } else if (exerciseType === "") {
      missingField = "Tipo de Ejercicio";
    } else if (exerciseMuscle === "") {
      missingField = "Músculo Trabajado";
    } else if (exerciseDifficulty === "") {
      missingField = "Dificultad";
    } else if (exerciseDescription.trim() === "") {
      missingField = "Descripción";
    }

    if (missingField) {
      alert(`Por favor, complete el campo: ${missingField}`);
      return;
    }

    const newExercise = {
      name: exerciseName,
      type: exerciseType,
      muscle: exerciseMuscle,
      difficulty: exerciseDifficulty,
      description: exerciseDescription,
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      exercises: [...prevFormData.exercises, newExercise],
    }));

    // Limpiar campos del formulario de ejercicio
    setExerciseName("");
    setExerciseType("");
    setExerciseMuscle("");
    setExerciseDifficulty("");
    setExerciseDescription("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Realizar la validación de campos en blanco
    if (
      formData.name_routine.trim() === "" ||
      formData.puntuation === "" ||
      formData.exercises.length === 0
    ) {
      alert("Por favor, complete todos los campos antes de enviar la rutina.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/routines/postRoutine", formData);

      if (response.status === 200) {
        console.log("Solicitud exitosa:", response.data);
        setRutinaCreada(true);
        setMensajeExito("¡Tu rutina ha sido creada exitosamente!");
        // Restablecer los campos del formulario después de enviar la rutina
        setExerciseName("");
        setExerciseType("");
        setExerciseMuscle("");
        setExerciseDifficulty("");
        setExerciseDescription("");
        setFormData({
          email: user.email,
          name_routine: "",
          exercises: [],
          puntuation: "",
        });
      } else {
        console.error("Error en la respuesta del servidor. Código de respuesta:", response.status);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div className={style.container}>
      <h1>Agregar rutina</h1>
      <form noValidate autoComplete="off">
        <TextField
          id="routineName"
          label="Nombre de la Rutina"
          value={formData.name_routine}
          onChange={handleNameRoutineChange}
        />
        <div>
          <label>Puntuación:</label>
          <Select value={formData.puntuation} onChange={handleRatingChange}>
            {ratings.map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating}
              </MenuItem>
            ))}
          </Select>
        </div>
        <h2>Agregar ejercicios asociados a la rutina</h2>
        <TextField
          id="exerciseName"
          label="Nombre del Ejercicio"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <FormControl>
          <InputLabel>Tipo de Ejercicio</InputLabel>
          <Select value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
            {exerciseTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Músculo Trabajado</InputLabel>
          <Select value={exerciseMuscle} onChange={(e) => setExerciseMuscle(e.target.value)}>
            {muscleTypes.map((muscle) => (
              <MenuItem key={muscle} value={muscle}>
                {muscle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Dificultad</InputLabel>
          <Select
            value={exerciseDifficulty}
            onChange={(e) => setExerciseDifficulty(e.target.value)}
          >
            {difficultyLevels.map((diff) => (
              <MenuItem key={diff} value={diff}>
                {diff}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="exerciseDescription"
          label="Descripción"
          value={exerciseDescription}
          multiline
          rows={5}
          onChange={(e) => setExerciseDescription(e.target.value)}
        />
        <Button variant="contained" onClick={handleExerciseAdd}>
          Agregar Ejercicio
        </Button>

        {/* Lista de ejercicios agregados */}
        {formData.exercises.map((exercise, index) => (
          <div key={index}>
            <h3>Ejercicio {index + 1}</h3>
            <div>Nombre: {exercise.name}</div>
            <div>Tipo: {exercise.type}</div>
            <div>Músculo: {exercise.muscle}</div>
            <div>Dificultad: {exercise.difficulty}</div>
            <div>Descripción: {exercise.description}</div>
          </div>
        ))}

        {rutinaCreada && (
          <div className={style.mensajeExito}>
            {mensajeExito}
          </div>
        )}

        <Button variant="contained" onClick={handleFormSubmit}>
          Crear rutina
        </Button>
      </form>
    </div>
  );
}

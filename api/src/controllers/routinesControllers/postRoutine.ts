const { Exercise, User, Routine } = require('../../db_connection');
import { Request, Response } from "express";

const postRoutine = async (req: Request, res: Response) => {
  const { email, name_routine, exercises, puntuation } = req.body;

  try {
    // Busca al usuario por su email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verifica si el nombre de la rutina ya existe para el usuario
    const existingRoutine = await Routine.findOne({
      where: {
        name_routine,
        author: user.username
      }
    });

    if (existingRoutine) {
      return res.status(400).json({ error: 'El nombre de la rutina ya existe' });
    }

    // Crea una rutina en la tabla de rutinas
    const routine = await Routine.create({
      name_routine,
      author: user.username,
      puntuation,
    });

    // Itera a través de los ejercicios y crea cada uno en la tabla de ejercicios
    for (const exerciseData of exercises) {
      const exercise = await Exercise.create(exerciseData);

      // Asocia el ejercicio con la rutina
      await routine.addExercise(exercise);
    }

    // Asocia la rutina con el usuario
    await user.addRoutine(routine);

    return res.status(200).json({ message: 'Rutina creada con éxito' });
  } catch (error) {
    console.error('Error al crear la rutina:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}

module.exports = postRoutine;

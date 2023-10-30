const axios = require('axios');
const { Exercise } = require('../../db_connection');
import { Request, Response } from 'express';
const {API_KEY_EXERCISES}= process.env

const addExercisesFromAPI = async (req:Request, res:Response) => {
    try {
    const { muscle } = req.query;
    const exercisesResponse = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
        headers: {
        'X-Api-Key': API_KEY_EXERCISES,
        'Content-Type': 'application/json'
        }
    });
    const exercisesData = exercisesResponse.data;
    if (!exercisesData || exercisesData.length === 0) {
        return res.status(404).json({ error: 'No exercises found for the given parameters' });
    }
    interface Exercise {
        name: string;
        type: string;
        muscle: string;
        difficulty: string;
        instructions: string;
        image: string;
        }
    const exercisesToCreate: Exercise[]=exercisesData.slice(0, 10).map((exercise:Exercise) => {
        return {
        name: exercise.name,
        type: exercise.type,
        muscle: exercise.muscle,
        difficulty: exercise.difficulty,
        description: exercise.instructions,
        };
    });
    const existingExercises = await Exercise.findAll({
        where: {
        name: exercisesToCreate.map(exercise => exercise.name)
        }
    });
    const exercisesToInsert = exercisesToCreate.filter(exercise => {
        return !existingExercises.some((existingExercise:Exercise) => existingExercise.name === exercise.name);
    });
    const createdExercises = await Exercise.bulkCreate(exercisesToInsert);
    return res.status(201).json({message:'Excercises added succesfully', data:createdExercises});
    } catch (error:any) {
    return res.status(500).json({ error: error.message });
    }
};

module.exports = addExercisesFromAPI;


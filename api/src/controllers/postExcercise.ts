const axios = require('axios');
const { Excercise } = require('../db_connection');
import { Request, Response } from 'express';
const {API_KEY_EXCERCISES}= process.env

const addExercisesFromAPI = async (req:Request, res:Response) => {
    try {
    const { muscle } = req.query;
    const exercisesResponse = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
        headers: {
        'X-Api-Key': API_KEY_EXCERCISES,
        'Content-Type': 'application/json'
        }
    });
    console.log(exercisesResponse.data);
    const exercisesData = exercisesResponse.data;
    if (!exercisesData || exercisesData.length === 0) {
        return res.status(404).json({ error: 'No exercises found for the given parameters' });
    }
    interface Excercise {
        name: string;
        type: string;
        muscle: string;
        difficulty: string;
        instructions: string;
        image: string;
        }
    const excercisesToCreate: Excercise[]=exercisesData.slice(0, 10).map((excercise:Excercise) => {
        return {
        name: excercise.name,
        type: excercise.type,
        muscle: excercise.muscle,
        difficulty: excercise.difficulty,
        description: excercise.instructions,
        };
    });
    const existingExcercises = await Excercise.findAll({
        where: {
        name: excercisesToCreate.map(excercise => excercise.name)
        }
    });
    console.log({existingExcercises})
    const excercisesToInsert = excercisesToCreate.filter(excercise => {
        return !existingExcercises.some((existingExcercise:Excercise) => existingExcercise.name === excercise.name);
    });
    console.log(excercisesToInsert)
    const createdExercises = await Excercise.bulkCreate(excercisesToInsert);
    return res.status(201).json({message:'Excercises added succesfully', data:createdExercises});
    } catch (error:any) {
    return res.status(500).json({ error: error.message });
    }
};

module.exports = addExercisesFromAPI;


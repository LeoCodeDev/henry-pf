const { Exercise } = require('../../db_connection');
import { Request, Response } from 'express';

const getExercises = async (_req: Request, res:Response) => {
  try {
    const exercises = await Exercise.findAll();
    return res.status(200).json(exercises);
  } catch (error:any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getExercises;
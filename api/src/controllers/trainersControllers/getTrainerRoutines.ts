const { Exercise, Routine } = require('../../db_connection')
import { Request, Response } from 'express'

const getTrainerRoutines = async (req: Request, res: Response) => {
    const { trainer_id } = req.query
    
  try {
    const createdRoutines = await Routine.findAll({
      where: {
        userAuthor: trainer_id,
      },
      include: [
        {
          model: Exercise,
        },
      ],
    })
    if (!createdRoutines) {
      return res.status(201).json({ message: 'User has not routines' })
    }

    return res.status(200).json(createdRoutines)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = getTrainerRoutines

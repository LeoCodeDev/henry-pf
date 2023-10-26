import { Request, Response } from "express";
const { Trainers_users, User} = require( "../../db_connection");

const getAllTrainersReviews = async (_req: Request, res: Response) => {
  try {

    const trainersComments = await Trainers_users.findAll({
      include: [
        {
          model: User, 
          as:'TrainerRated',
          attributes:['id_user','username']
        },
        {
          model: User,
          as:'UserRater',
          attributes:['id_user','username']
        } 
        ],
      order: [['date', 'DESC']], 
    });

    return res.json(trainersComments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching Trainers comments' });
  }
};

module.exports = getAllTrainersReviews;

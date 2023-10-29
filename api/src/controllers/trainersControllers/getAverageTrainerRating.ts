import { Request, Response } from "express";
const { Trainers_users, User} = require( "../../db_connection");

const getAvgTrainerRating = async (req: Request, res: Response) => {
  const {trainer_id} = req.query;
  
  try {
    const trainer = await User.findByPk(trainer_id);

    if (!trainer) return res.status(404).json({ message: 'User Not Found' });
    if(trainer.role !== "Trainer") return res.status(400).json({ message: 'User is not a Trainer' })

    const sumRatings = await Trainers_users.sum('rating',{where:{trainer_id: trainer_id}})
    const countRatings = await Trainers_users.count('rating',{where:{trainer_id: trainer_id}})
    const avgRating = sumRatings/countRatings
    
    return res.status(200).json({countRatings,avgRating});
    } catch (error:any) {
    return res.status(500).json({error:error.message});
    }
};

module.exports = getAvgTrainerRating;
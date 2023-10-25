import { Request, Response } from "express";
const { Trainers_users,User} = require( "../../db_connection");

const getAllTrainers = async (_req: Request, res: Response) => {
  try {

    const users_trainers = await User.findAll({
        where:{
            role: "Trainer"
        },
        attributes:['id_user','username','avatar']
    });

    const array_trainers = await Promise.all( users_trainers.map( async (user: any) => {
        const sumRatings = await Trainers_users.sum('rating',{where:{trainer_id: user.id_user}})
        const countRatings = await Trainers_users.count('rating',{where:{trainer_id: user.id_user}})
        const avgRating = sumRatings/countRatings
        
        return {...user.dataValues,countRatings,avgRating}
    }))

    return res.status(201).json(array_trainers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching Trainers comments' });
  }
};

module.exports = getAllTrainers;

import { Request, Response } from "express";
const { Trainers_users, User} = require( "../../db_connection");

const getTrainerReview = async (req: Request, res: Response) => {
  const {trainer_id} = req.query;
  
  try {
    const trainer = await User.findByPk(trainer_id);

    if (!trainer) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    
    if(trainer.role !== "Trainer") return res.status(400).json({ message: 'User is not a Trainer' })

    const comments = await Trainers_users.findAll({
      where: {
        trainer_id: trainer_id,
      },
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

    return res.json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching Trainer comments' });
  }
};

module.exports = getTrainerReview;

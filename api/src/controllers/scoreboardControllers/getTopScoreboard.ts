const { User, Team } = require('../../db_connection');
import { Response , Request } from "express";

export const getTopScoreboard = async (_req: Request , res: Response) => {
  try {
    const topUsers = await User.findAll({
      attributes:['id_user','avatar','username','score'],
      include: {model:Team, attributes: ['name']},
      order: [
        ["score", 'DESC'],
      ],
        
    });
    return res.status(200).json(topUsers)
  } catch (error) {
    console.log(error);
    
    return res.status(500).json(error);
  }
}

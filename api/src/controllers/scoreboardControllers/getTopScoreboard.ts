const { User } = require('../../db_connection');
import { Response , Request } from "express";

export const getTopScoreboard = async (_req: Request , res: Response) => {
  try {
    const topUsers = await User.findAll({
      order: [
        ["score", 'DESC'],
      ],
      attributes:['id_user','username','score']
    });
    
    return res.status(200).json(topUsers)
  } catch (error) {
    return res.status(500).json(error);
  }
}
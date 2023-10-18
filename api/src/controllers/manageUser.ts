const { User } = require('../db_connection'); 
import { Request, Response } from 'express';

const manageUser = async (req:Request, res:Response) => {
  try {
    const { id_user } = req.query;
    const { active } = req.body;

    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.active = active;
    await user.save();

    return res.status(200).json({ message: `User ${active ? 'activated' : 'deactivated'} successfully` });
  } catch (error:any) {
    return res.status(500).json(error.message);
  }
};

module.exports =  manageUser ;

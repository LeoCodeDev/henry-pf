const { User } = require('../../db_connection'); 
import { Request, Response } from 'express';

const manageUser = async (req:Request, res:Response) => {
  try {
    const { id_user } = req.query;
    const { active, role } = req.body;
    const user = await User.findByPk(id_user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if( typeof active!= 'undefined'){
      user.active = active;
    }
    if(typeof role!= 'undefined'){
      if(role === 'Admin'){
        user.role = 'User';
      }else{
        user.role = 'Admin';}}
        
        await user.save();
    return res.status(200).json({ message:'Data updated succesfully'});
  } catch (error:any) {
    return res.status(500).json({error:error.message});
  }
};

module.exports =  manageUser ;

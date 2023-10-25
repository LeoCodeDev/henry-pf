const { User, Exercise } = require('../../db_connection');
import { Request, Response } from 'express';

const getUserRoutines = async (req:Request, res:Response) => {
    try {
        const { email } = req.query;
    const user = await User.findOne({ where: { email }}
        );
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const routines = await user.getRoutines({include: [{
        model: Exercise
      }]});
    if(!routines.length) return res.status(404).json({error: 'No routines found'})
    return res.status(200).json(routines);
    } catch (error:any) {
    return res.status(500).json({ error: error.message });
    }
};

module.exports = getUserRoutines;
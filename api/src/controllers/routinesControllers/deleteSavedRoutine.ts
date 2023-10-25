const { User, Routine } = require('../../db_connection');
import { Request, Response } from 'express';

const deleteSavedRutine = async (req:Request, res:Response) => {
    const { email, id_routine } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        const routine = await Routine.findOne({ where: { id_routine } });
        if (!user || !routine) {
            return res.status(404).json({ message: "User or routine not foud" });
        }
        await user.removeRoutine(routine);
        return res.status(201).json({message: "saved routine has been deleted"})
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = deleteSavedRutine;
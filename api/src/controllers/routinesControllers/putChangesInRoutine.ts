const {Routine} = require('../../db_connection');
import {Request, Response} from 'express';

const putChangesInRoutine = async (req : Request, res : Response)=>{
    const{ exercises}=req.body;
    const {id} = req.params;
    try {
        const routine = await Routine.findOne({where:{id:id}});
        routine.exercises=exercises;
        await routine.save();
        return res.status(200).json({message:"Routine updated successfully", routine});
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
   
}
 module.exports = putChangesInRoutine;
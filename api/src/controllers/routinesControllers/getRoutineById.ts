const {Routine, Exercise, User} = require('../../db_connection');
import {Request, Response} from 'express';

const getRoutineById=async(req:Request, res:Response)=>{
    const {id_routine}=req.query
    const parsedId=parseInt(id_routine as string)
    try {
        const routine= await Routine.findByPk(parsedId,
            {include: Exercise, User})
        if(routine){
            res.status(200).json(routine)
        }}
    catch (error:any) {
        res.status(500).json({error:error.message})
    
    }
}

module.exports = getRoutineById;
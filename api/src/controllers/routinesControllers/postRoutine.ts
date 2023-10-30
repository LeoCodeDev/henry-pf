const { Exercise, User, Routine } = require('../../db_connection');
const {Op}=require("sequelize")
import { Request, Response } from "express";

const postRoutine= async (req: Request, res: Response) => {
    const{email, name_routine, exercises, puntuation}=req.body
    const parsedPuntuation= parseInt(puntuation)
    try {
        if(email && exercises){
        const author= await User.findOne({where:{email:email}})
        if(!author){
            res.status(404).json({message:"User not found"})
        } 
        const newRoutine= await Routine.create({author:author.username,name_routine, puntuation:parsedPuntuation})
        interface Exercise {
            id_exercise: number;
            name: string;
            type: string;
            muscle: string;
            difficulty: string;
            instructions: string;
            image: string;
            }
        const exerciseIds:number[] = exercises.map((exercise:Exercise)=> exercise.id_exercise);

        const exercisesToAssociate = await Exercise.findAll({
        where: {
            id_exercise: {
            [Op.in]: exerciseIds
            }
        }
        });
        if(!exercisesToAssociate){
            res.status(404).json({message:"Exercises not found"})
        }
        //pending to validate if there is an existing routine with same exercises already
        await newRoutine.setExercises(exercisesToAssociate)  
        await newRoutine.addUser(author)
        res.status(200).json({message:"Routine created succesfully"})
    }}
    catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = postRoutine;

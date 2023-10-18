const {User,Team}= require("../../db_connection")
import { Request, Response } from "express";


const getAllUsers=async(_req:Request, res:Response)=>{
try {
    const allUsers= await User.findAll({include:Team})
    if(allUsers){
        res.status(200).json(allUsers)
    } else{
        res.status(404).json({message:"Users not found"})
    }} catch (error:any) {
    res.status(500).json({error: error.message})
}
}

module.exports=getAllUsers;
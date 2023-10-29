const {User,Team, Sale, Product, Routine}= require("../../db_connection")

import { Request, Response } from "express";


const getAllUsers=async(_req:Request, res:Response)=>{
try {
    const allUsers = await User.findAll({
        include: [
            Team,
            { model: Sale, include: [Product] },
            Routine
        ]
      });
    if(allUsers){
        return res.status(200).json(allUsers)
    } else{
        return res.status(404).json({message:"Users not found"})
    }} catch (error:any) {
    return res.status(500).json({error: error.message})
}
}

module.exports=getAllUsers;
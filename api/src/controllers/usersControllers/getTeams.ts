const {Team}= require("../../db_connection")
import { Request, Response } from "express";

const getTeams= async (_req:Request, res:Response)=>{
    try {
        const allTeams= await Team.findAll()
        if(allTeams) return res.status(200).json(allTeams)
        return res.status(404).json({message:"No teams found"})
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}

module.exports=getTeams;

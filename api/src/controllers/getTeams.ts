const {Team}= require("../db_connection")
import { Request, Response } from "express";

const getTeams= async (_req:Request, res:Response)=>{
    try {
        const allTeams= await Team.findAll()
        if(allTeams) res.status(200).json(allTeams)
        res.status(404).json({message:"No teams found"})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports=getTeams;

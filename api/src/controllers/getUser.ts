const {User, Team}= require("../db_connection")
import { Request, Response } from "express";


const getUser= async (req:Request, res:Response)=>{
    const {username}=req.query
    try {
        const userData= await User.findOne({
            where:{username},
            include: Team
        })
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports=getUser;
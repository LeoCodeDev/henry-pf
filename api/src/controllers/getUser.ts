const {User, Team}= require("../db_connection")
import { Request, Response } from "express";


const getUser= async (req:Request, res:Response)=>{
    const {email}=req.query
    try {
        const userData= await User.findOne({
            where:{email},
            include: Team
        })
        res.status(200).json(userData)
    } catch (error:any) {
        res.status(500).json({error:error.message})
    }
}

module.exports=getUser;
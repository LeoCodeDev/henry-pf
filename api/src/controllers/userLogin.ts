const {User}= require("../db_connection")
import { Request, Response } from "express";

const userLogin= async (req: Request, res: Response)=>{
    const{username, password}=req.body    
    try{
        if(!username || !password){
            res.status(400).json({message:'Missing data'})
        } else{            
        const userFound= await User.findOne({ where: {username} })
        if(userFound){
            if(password===userFound.password){
                res.status(201).json({access: true})
            } else{
                res.status(402).json({message:'Wrong password'})
            }
        } else{
            res.status(404).json({message:'User not found'})
        }}
    }
    catch(error){
        res.status(500).json(error)
    }
}

module.exports=userLogin;
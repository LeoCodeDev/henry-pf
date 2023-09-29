const {User}= require("../db_connection")
import { Request, Response } from "express";

const userLogin= async (req: Request, res: Response)=>{
    const{email, password}=req.body    
    try{
        if(!email || !password){
            res.status(400).json({message:'Missing data'})
        } else{            
        const userFound= await User.findOne({ where: {email} })
        if(userFound){
            if(password===userFound.password){
                res.status(200).json({access: true})
            } else{
                res.status(401).json({message:'Wrong password'})
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
import { Request, Response } from "express";
const { Report } = require('../../db_connection')


const checkReport=async(req:Request,res:Response)=>{
    const {id,checked}=req.query
    try {
        const report=await Report.findOne({where:{id}})
        if(report){
            report.checkedStatus=checked
            await report.save()
            res.status(200).json({message:"Report Updated"})
        }else{
            res.status(404).json({message:"Report not found"})
        }
    } catch(error:any) {
        res.status(500).json({error:error.message})  
}}

module.exports=checkReport
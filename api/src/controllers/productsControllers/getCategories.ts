import { Response , Request } from "express";
const {Category} = require('../../db_connection')


const getCategories =async ( _req : Request , res:Response ) => {
    try {
        const allCategories = await Category.findAll();
        return res.status(200).json(allCategories);
    } catch (error : any) {
        return res.status(500).json({error: error.message})
    } 
}

module.exports = getCategories;
import { Response , Request } from "express";
const {Category} = require('../db_connection')


const getCategories =async ( _req : Request , res:Response ) => {
    try {
        const allCatergories = Category.findAll();
        return res.status(200).json(allCatergories);
    } catch (error : any) {
        return res.status(500).json({error: error.message})
    } 
}

module.exports = getCategories;
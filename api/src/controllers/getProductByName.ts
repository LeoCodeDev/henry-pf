import { Request, Response } from "express";
const { Product, Category } = require("../db_connection");
const { Op } = require("sequelize");

const getProductByName= async (req:Request,res:Response)=>{
    const {name}=req.query

    try {
        if(typeof name === 'string' && name.length > 0){
        const searchTerms = name.split(' ');
        const selectedProduct = await Product.findAll({
            where: {
                [Op.or]: searchTerms.map(term => ({
                name: { [Op.iLike]: `%${term}%` } ,  
                }))
            },
            include: Category
        });
        if (!selectedProduct.length) {
            return res.status(404).json({ message: 'Product not found' });
            } 
            else return res.status(200).json(selectedProduct);
        } else {
            return res.status(400).json({ message: 'Did not receive any search term' });}
        } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}

module.exports = getProductByName;
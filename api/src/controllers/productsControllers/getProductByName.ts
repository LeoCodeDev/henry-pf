import { Request, Response } from "express";
const { Product, Category } = require("../../db_connection");
const { Op } = require("sequelize");
import currenciesExchange  from "../currenciesExchanges";
import {Currency} from 'node-currency-exchange-rates';

const getProductByName= async (req:Request,res:Response)=>{
    const {name}=req.query
    const  to: Currency = req.query.to as Currency
    const from : Currency= "USD"
    try {
        if(typeof name === 'string' && name.length > 0){
        const searchTerms = name.split(' ');
        const selectedProduct = await Product.findAll({
            where: {
                active: true,
                [Op.or]: searchTerms.map(term => ({
                name: { [Op.iLike]: `%${term}%` } ,  
                }))
            },
            include: Category
        });
        if (!selectedProduct.length) {
            return res.status(404).json({ message: 'Product not found' });
            } 
            else{
            const rateResult = await currenciesExchange(from, to, "1")     
            if (typeof rateResult !== 'number') {
                return res.status(400).json({ error: rateResult.error });
            }
            const rate = rateResult;
            const newPricedProducts = selectedProduct.map( (product: any) => {
                const newPrice = product.price * rate;
                return { ...product.dataValues, price: newPrice };
                });
            return res.status(200).json(newPricedProducts);
            } 

        } else {
            return res.status(400).json({ message: 'Did not receive any search term' });}
        } catch (error:any) {
        return res.status(500).json({error:error.message});
    }
}

module.exports = getProductByName;
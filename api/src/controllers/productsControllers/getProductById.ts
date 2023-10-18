import { Request, Response } from "express";
const { Product, Category } = require("../../db_connection");
import currenciesExchange  from "../currenciesExchanges";
import {Currency} from 'node-currency-exchange-rates';


const getProductsById =async (req:Request , res: Response) => {
    const id = Number(req.query.id);
    const  to: Currency = req.query.to as Currency
    const from : Currency= "USD"
    try {
        const productFind = await Product.findOne({
            where: { id_product: id },
            include : Category
        })
        const newPrice = await currenciesExchange(from, to, productFind.price);

        const newPricedProduct = {
            ...productFind.dataValues,
            price: newPrice.toLocaleString()
        };

        return res.status(200).json(newPricedProduct)
    } catch (error:any) {
        return res.status(500).json({error : error.message })
    }
}


module.exports = getProductsById;
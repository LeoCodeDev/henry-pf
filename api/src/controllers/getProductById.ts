import { Request, Response } from "express";
const { Product } = require("../db_connection");

const getProductsById =async (req:Request , res: Response) => {
    const {id} = req.params;

    try {
        const productFind = await Product.findOne({
            where : {id : id}
        })

        return res.status(200).json(productFind)
    } catch (error) {
        return res.status(500).json({error : error})
    }
}


module.exports = getProductsById;
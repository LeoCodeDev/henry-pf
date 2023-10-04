import { Request, Response } from "express";
const { Product, Category } = require("../db_connection");

const getProductsById =async (req:Request , res: Response) => {
    const id = Number(req.params.id);

    try {
        const productFind = await Product.findOne({
            where: { id_product: id },
            include : Category
        })

        return res.status(200).json(productFind)
    } catch (error:any) {
        return res.status(500).json({error : error.message })
    }
}


module.exports = getProductsById;
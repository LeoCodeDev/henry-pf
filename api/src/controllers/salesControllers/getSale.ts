const { Sale, Product, User } = require('../../db_connection');
import { Request, Response } from "express";


const getSale = async (req:Request, res:Response) => {
    const {id_sale} = req.query;
    try {
        const sale = await Sale.findOne({
            where: { id_sale},
            include: [
                { model: User, attributes: ['username', 'first_name', 'last_name', 'email'] },
                { model: Product, attributes: ['id_product', 'name', 'price'] }
            ]
        });
        if (!sale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        return res.status(200).json(sale);
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getSale;

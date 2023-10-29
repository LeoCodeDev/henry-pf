const { Product } = require("../../db_connection");
import { Request, Response } from "express";

const updateProductStock = async (req:Request, res:Response) => {
    try {
        const {operation}=req.query
        interface Update {
            id_product: string,
            quantity: string
        }
        const updateData = req.body.map((update: Update) => ({
            id_product: parseInt(update.id_product),
            amount: parseInt(update.quantity)
        }));
        for (const update of updateData) {
            const product = await Product.findByPk(update.id_product);
            if (product) {
                const newStock = operation==="subtract"? product.stock - update.amount: product.stock + update.amount;
                if (newStock <= 0) {
                    product.active = false;
                }
                product.stock = Math.max(newStock, 0);
                await product.save();
            }
        }
        return res.status(200).json({ message: 'Stock updated successfully' });
    } catch (error:any) {
        return res.status(500).json({ message:error.message });
    }
};

module.exports =  updateProductStock ;
const { Product } = require("../db_connection");
import { Request, Response } from "express";

const updateProductStock = async (req:Request, res:Response) => {
    const{id_product, newStock}=req.query
    try {
    const product = await Product.findOne({ where: { id_product } });
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    await product.update({ stock: newStock });
    return res.status(200).json({ message: "Product stock updated successfully", product});
} catch (error:any) {
    return res.status(500).json({ error: error.message });
}
};

module.exports =  updateProductStock ;
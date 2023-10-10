const { Sale, Product, User } = require('../db_connection');
import { Request, Response } from "express";
//Pending variants handling

const createSale = async (req:Request, res:Response) => {
    const {  total, address, phone_number, products, email } = req.body;
    const parsedTotal=parseFloat(total)
    try {
        if(!total || !address || !phone_number || !products || !email)
        {res.status(400).json({ message: "Missing required fields" })}
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const sale = await Sale.create({
            
            total:parsedTotal,
            address,
            phone_number
        });
        await sale.setUser(user);
        interface Product{
            id_product: number;
            name: string;
            price: number;
            stock: number;
            description: string;
            image: string;
            category: string;
            rating:number;
            active: boolean
        }
        const productsList= products.map((product:Product) => product.id_product)
        const productsToAssociate = await Product.findAll({ where: { id_product: productsList } });

        if (!productsToAssociate || productsToAssociate.length !== products.length) {
            return res.status(404).json({ message: "Some products not found" });
        }
        await sale.setProducts(productsToAssociate);
        return res.status(200).json({ message: "Sale created successfully" });
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = createSale;


const { Sale, Product, User, Coupon } = require('../../db_connection');
import { Request, Response } from "express";
import axios from "axios";

const createSale = async (req:Request, res:Response) => {
    const {  total, address, phone_number, products, email, coupon } = req.body;
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
        if(coupon){
            const couponFound = await Coupon.findOne({ where: { code: coupon } });
            if (!couponFound) {
                return res.status(404).json({ message: "Cupon not found" });
            }
            await user.addCoupon(couponFound);
        }
        interface Product{
            id_product: number;
            name: string;
            price: number;
            stock: number;
            description: string;
            image: string;
            category: string;
            rating:number;
            active: boolean;
            quantity:number
        }
        const productsList= products.map((product:Product) => product.id_product)
        const productStock = products.map((product:Product) => ({
            id_product: product.id_product,
            quantity: product.quantity
            }));
        console.log('stock', productStock)
        try {
            await axios.put('http://localhost:8000/products/stockUpdate?operation=subtract', productStock)
        } catch (error) {
            console.log(error)
        }

        const productsToAssociate = await Product.findAll({ where: { id_product: productsList } });

        if (!productsToAssociate || productsToAssociate.length !== products.length) {
            return res.status(404).json({ message: "Some products not found" });
        }
        await sale.setProducts(productsToAssociate);
        return res.status(200).json({ message: "Sale created successfully" });
    } catch (error:any) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports = createSale;


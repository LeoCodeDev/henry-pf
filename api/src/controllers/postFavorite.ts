const {User, Product} = require('../db_connection');
import {Request, Response} from "express";


const postFavorite = async (req: Request, res: Response)=> {
    const { username, name} = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        const product = await Product.findOne({ where: { name } });
        if (!user || !product) {
            return res.status(404).json({ message: "User or product not foud" });
        }
        const hasRelation = await user.hasProduct(product);
        if (hasRelation) {
            return res.status(400).json({ message: "User already has a relationship with the product" });
        }
        await user.addProduct(product);
        return res.status(201).json({message: "Favorite created"})
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = postFavorite;
const {User, Product} = require('../../db_connection');
import {Request, Response} from "express";


const delFavorite = async (req: Request, res: Response)=> {
    const { username, id_product} = req.query;
    
    try {
        const user = await User.findOne({ where: { username } });
        const product = await Product.findOne({ where: { id_product } });
        if (!user || !product) {
            return res.status(404).json({ message: "User or product not foud" });
        }
        await user.removeProduct(product);
        return res.status(201).json({message: "Favorite deleted"})
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }
}


module.exports = delFavorite;
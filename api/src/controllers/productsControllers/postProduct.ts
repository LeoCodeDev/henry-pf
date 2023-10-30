const {Product, Category} = require('../../db_connection');
import {Request, Response} from "express";

const postProduct = async (req: Request, res: Response) => {
    try {
        const { name, image, description, price, stock, rating, category } = req.body;
        const parsedPrice = parseInt(price);
        const parsedStock = parseInt(stock);
        const parsedRating = parseInt(rating);
        if (!name || name === "" || !image || image === "" || !description || description === "" || isNaN(parsedPrice) || isNaN(parsedStock) || isNaN(parsedRating) || !category || category === "") {
            res.status(400).json({ message: "Missing or invalid data" });
            return;
        }
        const [product, created] = await Product.findOrCreate({
            where: { name },
            defaults: {
                name,
                image,
                description,
                price,
                stock,
                rating,
            },
            include: Category
        });

        if (created) {
            const [associatedCategory, _created] = await Category.findOrCreate({ where: { name: category } });
            if (associatedCategory) {
                await product.setCategory(associatedCategory);
            }
            res.status(200).json({status:200, message: "Product created successfully", data: product});
        } else {
            res.status(400).json({message: "Product is already registered", data: product });
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = postProduct;

import { Request, Response } from "express";
const { Product, Category,Sale,User} = require( "../../db_connection");

const productDetailSales = async(req: Request, res: Response) => {
    const { product }  = req.query
    try {
        const detailForProduct = await Product.findOne({
            where: {
                id_product: product
            },
            include: [
                    {
                    model: Category,
                    attributes: ['id_category', 'name'],
                    },
                    {
                    model: Sale,
                    include: [
                        {
                            model: User,
                            attributes: ['id_user', 'first_name', 'last_name', 'email'],
                        }
                    ]
                    },
                ]
        })
        res.status(200).json(detailForProduct)
    } catch (error) {
        res.status(404).json({error: "Product not found"})
    }
}

export default productDetailSales
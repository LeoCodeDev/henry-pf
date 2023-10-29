import { Request, Response } from 'express';
// const { Product, Sale}= require('../../db_connection') ;
import { QueryTypes } from 'sequelize';
const {sequelize }= require('../../db_connection');

async function salesMetrics(req: Request, res: Response) {
    try {
        const order = req.query.order === 'less' ? 'ASC' : 'DESC';
        const products = await sequelize.query(`
    SELECT 
        "Product"."id_product", 
        "Product"."name", 
        "Product"."description", 
        "Product"."price", 
        "Product"."stock", 
        "Product"."rating", 
        "Product"."active", 
        COUNT("SalesProducts"."ProductIdProduct") AS "totalSales"
    FROM 
        "Products" AS "Product"
    LEFT JOIN 
        "sales_products" AS "SalesProducts" 
    ON 
        "Product"."id_product" = "SalesProducts"."ProductIdProduct"
    GROUP BY 
        "Product"."id_product"
    ORDER BY 
        "totalSales" ${order}
    LIMIT 10
    `, { type: QueryTypes.SELECT });
        return res.status(200).json(products);
    } catch (error:any) {
        return res.status(500).json({error:error.message});
    }
}

module.exports= salesMetrics;



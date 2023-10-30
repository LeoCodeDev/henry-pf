import { Request, Response } from 'express';
// const { User, Sale } =require('../../db_connection') ;
const { sequelize } =require('../../db_connection');

async function userSalesMetrics(req: Request, res: Response) {
    try {
    const order = req.query.order === 'less' ? 'ASC' : 'DESC';
    const users = await sequelize.query(`
    SELECT 
    "User"."id_user", 
    "User"."first_name",
    "User"."last_name", 
    "User"."email", 
    COUNT("Sales"."id_sale") AS "totalSales",
    (SELECT COALESCE(json_agg("Sales".*), '[]'::json) 
    FROM "Sales" 
    WHERE "Sales"."UserIdUser" = "User"."id_user") AS "salesArray",
    (SELECT COALESCE(json_agg("Products".*), '[]'::json) 
    FROM "Products"
    INNER JOIN "sales_products" ON "Products"."id_product" = "sales_products"."ProductIdProduct"
    INNER JOIN "Sales" ON "sales_products"."SaleIdSale" = "Sales"."id_sale"
    WHERE "Sales"."UserIdUser" = "User"."id_user") AS "productsArray"
  FROM 
    "Users" AS "User"
  LEFT JOIN 
    "Sales" AS "Sales" 
  ON 
    "User"."id_user" = "Sales"."UserIdUser"
  GROUP BY 
    "User"."id_user"
  ORDER BY 
    "totalSales" ${order}
  LIMIT 10`,{type: sequelize.QueryTypes.SELECT}
);

    return res.status(200).json(users);
    } catch (error:any) {
    return res.status(500).json({error:error.message});
    }
}

module.exports = userSalesMetrics;

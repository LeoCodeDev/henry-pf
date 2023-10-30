import { Request, Response } from 'express';
const { Product }= require('../../db_connection') ; // Import your Sequelize models

async function ratingMetrics(req: Request, res: Response) {
try {
    const order = req.query.order === 'less' ? 'ASC' : 'DESC';
    const products = await Product.findAll({
        order: [['rating', order]],
        limit: 10
    });

    return res.status(200).json(products);
    } catch (error:any) {
    return res.status(500).json({error:error.message});
    }
}

module.exports=ratingMetrics;
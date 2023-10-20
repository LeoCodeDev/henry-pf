import { Request, Response } from 'express';
const { Sale }=require('../../db_connection') ; 
import { Op } from 'sequelize';

async function getSalesByDate(req: Request, res: Response) {
try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        const allSales= await Sale.findAll()
        return res.status(200).json(allSales);
    }
    else{
        const sales = await Sale.findAll({
            where: {
                date: {
                [Op.between]: [startDate, endDate]
                }
            }
        });
            return res.status(200).json(sales);
    }
} catch (error:any) {
    return res.status(500).json(error.message);
}
}

module.exports = getSalesByDate

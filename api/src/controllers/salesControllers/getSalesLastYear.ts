const { Sale } = require('../../db_connection');
import { Request, Response } from 'express';
import { Op, fn, col } from 'sequelize';

const lastYearSales = async (_req: Request, res: Response) => {
  try {
    const currentDate = new Date()
    const oneYearAgoDate = new Date()
    // oneYearAgoDate.setMonth(oneYearAgoDate.getMonth() - 12)
    const getMonthYear = oneYearAgoDate.getMonth()

    console.log({currentDate, oneYearAgoDate, getMonthYear});
    

    const last12MonthSales = await Sale.findAll({
      attributes: [
        [fn('date_trunc', 'month', col('date')), 'month'],
        [fn('sum', col('total')), 'total'],
      ],
      where: {
        date: {
          [Op.gte]: oneYearAgoDate,
          [Op.lte]: currentDate,
        },
      },
      group: 'month',
      order: [[col('month'), 'ASC']],
    });

    const sales : Record<string, number> = {};

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

    months.forEach(month=>{
        console.log({month});
        sales[month] = 0
    })

    console.log({last12MonthSales});
    

    last12MonthSales.forEach((sale: any) => {
      const monthIndex = sale.get('month').getMonth();
      const month = months[monthIndex]
      const monthTest = ('0' + (sale.get('month').getMonth() + 1)).slice(-2)
    //   const monthTest2 = monthTest.getMonth()
      console.log({sale, monthIndex, month, monthTest, total : sales[month]});
      
      const total = parseFloat(sale.get('total'));
      sales[month] = total
    });

    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener las ventas de los últimos 12 meses' });
  }
}

module.exports = lastYearSales;

const { Sale } = require('../../db_connection')
import { Request, Response } from 'express'
import { Op, fn, col } from 'sequelize'

const lastYearSales = async (req: Request, res: Response) => {
  const { type } = req.query
  try {
    const currentDate = new Date()
    const oneYearAgoDate = new Date()
    oneYearAgoDate.setMonth(oneYearAgoDate.getMonth() - 12)

    const last12MonthSales = await Sale.findAll({
      attributes: [
        [fn('date_trunc', 'month', col('date')), 'month'],
        [fn(`${type}`, col('id_sale')), 'total'],
      ],
      where: {
        date: {
          [Op.gte]: oneYearAgoDate,
          [Op.lte]: currentDate,
        },
      },
      group: 'month',
      order: [[col('month'), 'ASC']],
    })

    const sales: Record<string, number> = {}

    const months = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ]

    months.forEach((month) => {
      sales[month] = 0
    })

    last12MonthSales.forEach((sale: any) => {
      let month = sale.get('month').getMonth() + 1
      const total = parseFloat(sale.get('total'))
      if (month >= 12) {
        month -= 12
      }
      sales[months[month]] = total
    })

    return res.status(200).json(sales)
  } catch (error:any) {
    return res.status(500).json({error: error.message})
  }
}

module.exports = lastYearSales

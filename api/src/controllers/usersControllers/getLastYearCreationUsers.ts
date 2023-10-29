const { User } = require('../../db_connection');
import { Request, Response } from 'express';
import { Op, fn, col } from 'sequelize';

const lastYearSales = async (_req: Request, res: Response) => {
  try {
    const currentDate = new Date();
    const oneYearAgoDate = new Date();
    oneYearAgoDate.setMonth(oneYearAgoDate.getMonth() - 12);

    const last12MontUsers = await User.findAll({
      attributes: [
        [fn('date_trunc', 'month', col('createdAt')), 'month'],
        [fn(`count`, col('id_user')), 'total']
      ],
      where: {
        createdAt: {
          [Op.gte]: oneYearAgoDate,
          [Op.lte]: currentDate,
        },
      },
      group: 'month',
      order: [[col('month'), 'ASC']],
    });

    const usersCount: Record<string, number> = {};

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    months.forEach((month) => {
        usersCount[month] = 0;
    });

    last12MontUsers.forEach((user: any) => {
      let month = user.get('month').getMonth() + 1;      
      const total = Number(user.get('total')); 
      if (month >= 12) {
        month -= 12;
      }
      usersCount[months[month]] = total;      
    });

    res.status(200).json(usersCount);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = lastYearSales;

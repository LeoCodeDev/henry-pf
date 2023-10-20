import { Request, Response } from "express";
const { Report,  Product, Rating,User} = require('../../db_connection')

const getAllReports = async (_req: Request, res: Response) => {
  try {
    const allReports = await Report.findAll({
       include: [
            { model: User, as: 'reportedUser', attributes: ['username','email'] },
            { model: User, as: 'reporterUser', attributes: ['username','email'] },
            { model: Product,  as: 'reportedProduct',attributes: ['id_product','name']},
            { model: Rating,  as: 'reportedComment',attributes: ['id','comment']}
          ],
    });
    return res.status(200).json(allReports);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllReports;

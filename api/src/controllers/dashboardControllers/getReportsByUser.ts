import { Request, Response } from "express";
const { Report,  Product, Rating,User} = require('../../db_connection')

const getReportsByUser = async (req:Request, res:Response) => {
    try {
      const {id_user} = req.query; 
      
      const reportsMadeByUser = await Report.findAll({
        where: {
          reporterId: id_user
        },
        include: [
          { model: User, as: 'reportedUser', attributes: ['username','email'] },
          { model: User, as: 'reporterUser', attributes: ['username','email'] },
          { model: Product, as: 'reportedProduct', attributes: ['id_product','name']},
          { model: Rating, as: 'reportedComment', attributes: ['id','comment']}
        ],
      });
  
      return res.status(200).json(reportsMadeByUser);
    } catch (error:any) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = getReportsByUser;
  
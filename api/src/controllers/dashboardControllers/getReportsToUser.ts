import { Request, Response } from "express";
const { Report,  Product, Rating,User} = require('../../db_connection')

const getReportsToUser = async (req:Request, res:Response) => {
    try {
      const {email} = req.query; 

      const user= await User.findOne({where:{email}})
      
      const reportsMadeByUser = await Report.findAll({
        where: {
            reportedIdUser: user.id_user
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
  
  module.exports = getReportsToUser;
const { Report, Product, User} = require('../../db_connection');
import { Request, Response } from 'express';

const getReportsForProduct = async (req:Request, res:Response) => {
  try {
    const { productId } = req.query; 

    const reports = await Report.findAll({
      where: { reportedIdProduct: productId },
      include: [
        { model: Product, as: 'reportedProduct', attributes: ['id_product', 'name'] },
        { model: User, as: 'reporterUser', attributes: ['username','email'] } 
      ]
    });

    return res.status(200).json(reports);
  } catch (error:any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getReportsForProduct;

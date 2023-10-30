const { Sale, User, Product } = require('../../db_connection');
import { Request, Response } from 'express'; 

const getUserSales = async (req:Request, res:Response) => {
try {
    const { id_user } = req.query; 

    const user = await User.findByPk(id_user, {
        include: [
            {
              model: Sale,
              include: Product,
            }
          ]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const sales = user.Sales;

    return res.status(200).json(sales);
  } catch (error:any) {
    return res.status(500).json({error:error.message});
  }
};

module.exports = getUserSales

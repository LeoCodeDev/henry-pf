import { Request, Response } from 'express';
const { Rating, User, Product } = require('../../db_connection');

const getUserRating = async (req:Request, res:Response) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const ratings = await Rating.findAll({
      where: { userId: user.id_user },
      include: [
        { model: Product, attributes: ['id_product', 'name'] }
      ]
    });

    return res.status(200).json(ratings);
  } catch (error:any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getUserRating;

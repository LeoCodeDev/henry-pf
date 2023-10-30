import { Request, Response } from "express";
const { Product, Rating, User} = require( "../../db_connection");

const getProductReviews = async (req: Request, res: Response) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const comments = await Rating.findAll({
      where: {
        productId: productId,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [['updatedAt', 'DESC']], 
    });

    return res.json(comments);
  } catch (error:any) {
    return res.status(500).json({ error:error.message });
  }
};

module.exports = getProductReviews;

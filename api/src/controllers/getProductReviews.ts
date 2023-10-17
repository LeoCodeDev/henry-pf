import { Request, Response } from "express";
const { Product, Rating, User} = require( "../db_connection");

const getProductReviews = async (req: Request, res: Response) => {
  const productId = req.params.productId; 

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    const comments = await Rating.findAll({
      where: {
        productId: productId,
      },
      include: [
        {
          model: User, attributes: ["username"]
      }
    ]
    });
    
    return res.json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los comentarios' });
  }
};

module.exports = getProductReviews;

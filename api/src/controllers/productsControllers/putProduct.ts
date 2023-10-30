const {Product} = require('../../db_connection');
import { Request, Response } from "express";


async function activeDesactiveproduct(req: Request, res: Response) {
    const id = Number(req.params.id);

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const newActiveStatus = !product.active;
    await product.update({ active: newActiveStatus });
    return res.json({
      message: `Status has been changed to ${newActiveStatus}`,
    });
  } catch (error:any) {
    return res.status(500).json({ message:error.message});
  }
}

module.exports = activeDesactiveproduct;

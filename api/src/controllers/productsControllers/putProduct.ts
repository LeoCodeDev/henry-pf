const {Product} = require('../../db_connection');
import { Request, Response } from "express";


async function activeDesactiveproduct(req: Request, res: Response) {
    const id = Number(req.params.id);

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    const newActiveStatus = !product.active;
    await product.update({ active: newActiveStatus });
    return res.json({
      message: `El estado activo del producto se ha cambiado a ${newActiveStatus}`,
    });
  } catch (error) {
    console.error('Error al cambiar el estado activo del producto', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = activeDesactiveproduct;

import { Request, Response } from "express";

const { Product, Category } = require("../db_connection");

const getProducts = async (_req: Request, res: Response) => {
  try {
    const activeProducts = await Product.findAll({
      where: {
        active: true
      },
      include: Category
    });
    return res.status(200).json(activeProducts);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getProducts;


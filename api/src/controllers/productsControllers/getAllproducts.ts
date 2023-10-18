import { Request, Response } from "express";

const { Product, Category } = require("../../db_connection");

const getAllProductsAdmin = async (_req: Request, res: Response) => {
  try {
    const allProducts = await Product.findAll({include: Category});
    return res.status(200).json(allProducts);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllProductsAdmin;


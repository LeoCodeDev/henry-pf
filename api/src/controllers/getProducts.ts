import { Request, Response } from "express";

const { Product } = require("../db_connection");

const getProducts = async (_req: Request, res: Response) => {
  try {
    const allProducts = await Product.findAll();
    return res.status(200).json(allProducts);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getProducts;

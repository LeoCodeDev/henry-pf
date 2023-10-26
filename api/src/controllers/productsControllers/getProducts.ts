import { Request, Response } from "express";
import currenciesExchange  from "../currenciesExchanges";
 import {Currency} from 'node-currency-exchange-rates';

const { Product, Category} = require("../../db_connection");

const getProducts = async (req: Request, res: Response) => {
  const to: Currency = req.query.to as Currency;
  const from: Currency = "USD";
  
  try {

    const allProducts = await Product.findAll({
      where: {
        active: true
      },
      include: Category
    });
    
    if (typeof from === 'string' && typeof to === 'string') {
      const rateResult = await currenciesExchange(from, to, "1")     
      if (typeof rateResult !== 'number') {
        return res.status(400).json({ error: rateResult.error });
      }
      const rate = rateResult;
      const newPricedProducts = await Promise.all(allProducts.map(async (product: any) => {
        const newPrice = product.price * rate;
        return { ...product.dataValues, price: parseFloat(newPrice.toFixed(2)) };
      }));
      return res.status(200).json(newPricedProducts);
    } else {
      return res.status(400).json({ error: "Invalid query parameters, please check and try again" });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};



module.exports = getProducts;




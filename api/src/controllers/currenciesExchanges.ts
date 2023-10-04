import { Request, Response } from "express";
const CC = require('currency-converter-lt');

const currenciesExchange = async (_req:Request, res:Response)=>{
    const {from, to, amount} = _req.body; 
try {
      let currencyConverter = new CC({from:from, to:to, amount:amount})
        const change = await currencyConverter.convert().then((result:any)=>{
            return result
        })
        return res.status(200).json(change);
} catch (error:any) {
    return res.status(500).json({error: error.message})
}}

module.exports = currenciesExchange;
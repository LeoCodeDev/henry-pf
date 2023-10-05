// import { Request, Response } from "express";
const CC = require('currency-converter-lt');

const currenciesExchange = async (from:string, to:string, amount:string)=>{
    const parsedAmount=parseInt(amount)
try {
    let currencyConverter = new CC({from:from, to:to, amount:parsedAmount})
        const change = await currencyConverter.convert().then((result:any)=>{
            return result
        })
        return change;
} catch (error:any) {
    return {error: error.message}
}}

export default currenciesExchange;
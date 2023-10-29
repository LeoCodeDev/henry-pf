require("dotenv").config();
const {SECRET_KEY_STRIPE} = process.env;
import { Request, Response } from 'express';


const stripe = require('stripe')(SECRET_KEY_STRIPE);

const payment = async (req:Request, res:Response) => {
    
    const {amount , currency} = req.body
    
    
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount ,
        currency: currency ,
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return res.json({client_secret: paymentIntent.client_secret})
    } catch (error:any) {
      return res.status(500).json({error:error.message})
    }

}

module.exports = payment
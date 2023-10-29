const { Coupon } = require('../../db_connection');
import {Request, Response} from 'express';

const addCoupon = async (req: Request, res: Response) => {
    const {code, discount, expiration} = req.body;
    try {
        if(!code || !discount || !expiration) return res.status(400).json({message: 'Missing required fields'})
        if(discount > 100) return res.status(400).json({message:'Discount cannot be greater than 100'})
        if(discount < 0) return res.status(400).json({message:'Discount cannot be less than 0'})
        if( await Coupon.findOne({where: {code}})) return res.status(400).json({message:'Coupon already exists'})
        else{
            await Coupon.create({
                code,
                discount: parseFloat(discount),
                expiration
            })
            return res.json({message: 'Coupon added successfully'})
        }
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}

module.exports = addCoupon;
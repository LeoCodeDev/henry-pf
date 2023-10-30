const { Coupon } = require('../../db_connection');
import {Request, Response} from 'express';

const getCoupons = async (_req: Request, res: Response) => {
    try {
        const coupons = await Coupon.findAll();
        if(!coupons.length) return res.status(404).json({message: 'No coupons found'})
        return res.status(200).json(coupons);
    }catch (error:any) {
        return res.status(500).json({error:error.message});
    }
}

module.exports= getCoupons
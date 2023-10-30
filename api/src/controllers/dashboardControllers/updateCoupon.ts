const { Coupon } = require('../../db_connection');
import { Request, Response } from 'express';

const updateCoupon = async (req: Request, res: Response) => {
    const { id } = req.query;
    const { code, discount, expiration, active } = req.body;
    try {
        const coupon = await Coupon.findByPk(id);
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        if (typeof code !== 'undefined') {
            coupon.code = code;
        }
        if (typeof discount !== 'undefined') {
            coupon.discount = discount;
        }
        if (typeof expiration !== 'undefined') {
            coupon.expiration = expiration;
        }
        if (typeof active !== 'undefined') {
            coupon.active = active;
        }
        await coupon.save();
        return res.json({ message: 'Coupon updated successfully' });
    } catch (error:any) {
        return res.status(500).json({error:error.message});
    }
}

module.exports = updateCoupon;
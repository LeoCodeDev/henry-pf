const { User, Coupon } = require('../../db_connection');
import { Request, Response } from 'express';

const validateCoupon = async (req: Request, res: Response) => {
    const { email, code } = req.query;
    try {
        const user= await User.findOne({where:{email}})
        const coupon = await Coupon.findOne({
            where: {
                code
            }
        });
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        if (coupon.expiration && new Date(coupon.expiration) < new Date()) {
            return res.status(400).json({ message: 'Coupon has expired' });
        }
        const userHasCoupon = await coupon.hasUser(user.id_user);
        if (userHasCoupon) {
            return res.status(400).json({ message: 'Coupon has been used already' });
        }
        return res.status(200).json({ message: 'Coupon is valid', discount:coupon.discount });
    } catch (error:any) {
        return res.status(500).json({error:error.message});
    }
}

module.exports = validateCoupon;
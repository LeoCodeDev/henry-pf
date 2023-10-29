const { User } = require('../../db_connection'); 
import {Request, Response} from 'express'
const nodemailer = require('nodemailer');
const {generateResetToken}= require ('../JWT')
const { PASS_MAIL, DIR_MAIL } = process.env;
const domain = process.env.DOMAIN || 'localhost';

const resetPassword= async (req:Request, res:Response) => {
const { email } = req.query;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    }
    const resetToken = generateResetToken({ userId: user.id }); 
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: DIR_MAIL, 
            pass: PASS_MAIL, 
        },
        });
    
    const mailOptions = {
        from: DIR_MAIL, 
        to: email, 
        subject: 'Password Reset',
        text: `Please enter the following token to reset your password:
                ${resetToken}
                This token will expire in 1 hour.
                If you did not request a password reset, please ignore this email.`,
        }
    try {
        await transporter.sendMail(mailOptions);
        res.cookie('resetToken', resetToken, { httpOnly: true, maxAge: 3600000, sameSite: 'none', secure: true, domain:domain })
        return res.status(200).json({ message: 'Mail sent successfully' });
        } catch (error:any) {
        return res.status(500).json({error:error.message});
        }
}

module.exports= resetPassword
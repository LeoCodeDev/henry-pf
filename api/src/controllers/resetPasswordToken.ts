const { User } = require('../db_connection'); 
import {Request, Response} from 'express'
const nodemailer = require('nodemailer');
const { PASS_MAIL, DIR_MAIL } = process.env;

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
        text: `<p>Please enter the following token to reset your password: ${resetToken}</p>
                <p>This token will expire in 1 hour.</p>
                <p>If you did not request a password reset, please ignore this email.</p>`,
        }
    try {
        await transporter.sendMail(mailOptions);
        res.cookie('resetToken', resetToken, { httpOnly: true, maxAge: 3600000 })
        res.status(200).json({ message: 'The mail sent successfully' });
        } catch (error) {
        res.status(500).json({ message: 'Error sending mail' });
        }
}

module.exports= resetPassword
import {Request, Response} from 'express'
const sgMail = require('@sendgrid/mail');
const {SENDGRID_APIKEY}=process.env

const emailSender=async(req:Request, res:Response)=>{
    const {to,subject, text}=req.body
    sgMail.setApiKey(SENDGRID_APIKEY);

    try {
        const msg = {
            to: to ,
            from: 'HealTech Group <healtechgroup@gmail.com>',
            subject: subject,
            text: text,
            html: `<p>${text}</p>`,
        };
        
        await sgMail.sendMultiple(msg)
        return res.status(200).json({ message: 'Email sent' });
    }catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}

module.exports= emailSender


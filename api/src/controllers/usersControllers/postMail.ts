const nodemailer = require('nodemailer');
const { PASS_MAIL, DIR_MAIL } = process.env;
import {Request, Response} from "express";


const postMail = async (req: Request, res: Response) => {
  const { email, title, message } = req.body;

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
    subject: title,
    text: message,
  };  

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'The mail sent successfully' });
  } catch (error:any) {
    return res.status(500).json({ error:error.message});
  }
};

module.exports = postMail;

const jwt = require('jsonwebtoken');
import { Request, Response } from "express";
const {SECRET_ACCESS_TOKEN}=process.env

const validateAccessToken = (req:Request, res:Response) => {
const {accessToken} = req.body;
try {
    interface Decoded{
        userId: number;
        username: string;
        iat: number;
        exp: number; 
    }
    jwt.verify(accessToken, SECRET_ACCESS_TOKEN, (error:any, decoded:Decoded) => {
    if (error) {
        res.status(401).json({ valid: false, message: 'Invalid token' });
    }
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTimestamp) {
        res.status(401).json({ valid: false, message: 'Token has expired' });
    }
        res.status(200).json({ valid: true, decoded });
    });
    } catch (error:any) {
    res.status(500).json({ error: error.message });
    }
};

module.exports = validateAccessToken ;
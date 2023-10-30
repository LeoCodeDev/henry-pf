const jwt = require('jsonwebtoken');
import { Request, Response } from "express";
const {SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN}=process.env

const validateAccessToken = async (req:Request, res:Response) => {
const accessToken = req.cookies.accessToken;
const refreshToken= req.cookies.refreshToken
console.log(req.cookies);
try {
    interface Decoded{
        userId: number;
        username: string;
        iat: number;
        exp: number; 
    }
    if(!accessToken || !refreshToken)
        res.status(401).json({ valid: false, message: 'No token provided' })
        else { await jwt.verify(accessToken? accessToken : refreshToken, accessToken? SECRET_ACCESS_TOKEN : SECRET_REFRESH_TOKEN , (error:any, decoded:Decoded) => {
        if (error) 
            res.status(401).json({ valid: false, message: 'Invalid token' });   
        else{ 
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTimestamp) 
                res.status(401).json({ valid: false, message: 'Token has expired' });
                else { res.status(200).json({ valid: true, decoded })};
            }
    });
    }} catch (error:any) {
    res.status(500).json({ error: error.message });
    }
};

module.exports = validateAccessToken ;
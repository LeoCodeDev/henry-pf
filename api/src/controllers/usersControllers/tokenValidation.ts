const jwt = require('jsonwebtoken');
import { Request, Response } from "express";
const {SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN}=process.env

const validateAccessToken = async (req: Request, res: Response) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    interface Decoded {
        userId: number;
        username: string;
        iat: number;
        exp: number;
    }

    try {
        if (!accessToken || !refreshToken) {
            return res.status(401).json({ valid: false, message: 'No token provided' });
        }

        const secret = accessToken ? SECRET_ACCESS_TOKEN : SECRET_REFRESH_TOKEN;
        const decoded = await jwt.verify(accessToken || refreshToken, secret) as Decoded;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTimestamp) {
            return res.status(401).json({ valid: false, message: 'Token has expired' });
        } else {
            return res.status(200).json({ valid: true, decoded });
        }
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = validateAccessToken ;
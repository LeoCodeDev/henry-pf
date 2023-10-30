const {RefreshToken, User} = require('../../db_connection');
import {Request, Response} from 'express';
const {Op}= require('sequelize');
const {generateAccessToken}= require('../JWT')
const domain = process.env.DOMAIN || 'localhost';

const refreshToken = async (req:Request, res:Response) => {
    try {
        const refreshTokenFromCookies = req.cookies.refreshToken
    const refreshTokenRecord = await RefreshToken.findOne({
    where: {
        token: refreshTokenFromCookies,
        expiresAt: { [Op.gt]: new Date() },
    },
    });
    if (!refreshTokenRecord) {
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
    const user= await User.findByPk(refreshTokenRecord.UserIdUser)
    const accessToken = generateAccessToken({
    username: user.username,
    id_user: user.id_user,
    });
    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 3600000, sameSite: 'none', secure: true, domain:domain })
    return res.status(200).json({ message: 'Access token refreshed successfully' });
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = refreshToken;
const {RefreshToken} = require('../db_connection');
import {Request, Response} from 'express';
const {Op}= require('sequelize');

const refreshToken = async (req:Request, res:Response) => {
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
    const accessToken = generateAccessToken({
    username: refreshTokenRecord.User.username,
    id_user: refreshTokenRecord.User.id_user,
    });
    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 3600000 })
    res.status(200).json({ message: 'Access token refreshed successfully' });
};

module.exports = refreshToken;
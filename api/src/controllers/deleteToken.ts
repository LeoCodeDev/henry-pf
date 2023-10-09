const {RefreshToken} = require('../db_connection'); 
import { Request, Response  } from "express";

const deleteRefreshToken = async (req:Request, res:Response) => {
    try{
        const refreshTokenId = req.cookies.refreshToken ; 
        const token = await RefreshToken.findByPk(refreshTokenId);
        if (!token) {
            res.status(404).json({ message: 'Token not found' });
        }
        await token.destroy();
            res.status(200).json({ message: 'Token deleted successfully' });
        
    }catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteRefreshToken;
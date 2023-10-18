const { RefreshToken } = require('../../db_connection');
import { Request, Response } from "express";

const deleteRefreshToken = async (req: Request, res: Response) => {
    const { id_user } = req.query;
    const refreshToken = req.cookies.refreshToken;
    try {
        const token = await RefreshToken.findOne({ where: { UserIdUser: id_user, token: refreshToken } });

        if (!token) {
            return res.status(404).json({ message: 'Token not found' });
        }

        await token.destroy();
        
        return res.status(200).json({ message: 'Token deleted successfully' });
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = deleteRefreshToken;

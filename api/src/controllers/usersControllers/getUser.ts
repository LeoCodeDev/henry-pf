const { User, Team, Sale, Product, Routine } = require("../../db_connection")
import { Request, Response } from "express";


const getUser = async (req: Request, res: Response) => {
    const { email } = req.query
    try {
        const userData = await User.findOne({
            where: { email },
            include: [
                Team,
                { model: Sale, include: [Product] },
                Routine
            ]
        })

        if (!userData) {
            return res.status(404).json({
                "message": "User not found"
            })
        }

       return res.status(200).json(userData)
    } catch (error: any) {
       return res.status(500).json({ error: error.message })
    }
}

module.exports = getUser;
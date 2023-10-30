const {User } = require('../../db_connection')
import { Response , Request } from "express";


export const getUserScoreboard = async (req: Request, res: Response) => {
    
    const {username} = req.query;  
    try {
        const user = await User.findOne({where: {username: username}})
        const player = {
            username: user.username,
            level: user.score?.level, //*Nro de lvl
            lvlName: user.score?.status,
            quote: user.score?.quote,
            currentExp: user.score?.levelscore, //*Current exp of level
            totalExp: user.score?.score, //*Exp total acumulada
            nextlvlExp: user.score?.leveltotal, //*Exp necesaria para pasar al prox lvl
            progress: user.score?.levelprogress, //* Porcentaje del nivel actual completado ()
            achievement: [],
            prestige: user.score?.prestige
        }

        return res.status(200).json(player);
    } catch (error:any) {
        return res.status(500).json({error: error.message})
    }
}

import { Response , Request } from "express";
import { increaseScore } from "../../utils/scoreboard/increaseScore";
import { decreaseScore } from "../../utils/scoreboard/decreaseScore";


export const testUserScoreboard = async (req: Request, res: Response) => {
    
    const {id_user , exp ,type} = req.query;  
    try {
        
        const user = (type === 'increase') ? await increaseScore(Number(id_user),Number(exp)) : await decreaseScore(Number(id_user),Number(exp))
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
import {Router} from 'express'
import { getUserScoreboard } from '../controllers/scoreboardControllers/getUserScoreboard'
import { testUserScoreboard } from '../controllers/scoreboardControllers/testUserScoreboard'
import { getTopScoreboard } from '../controllers/scoreboardControllers/getTopScoreboard'


const scoreboardRoutes = Router()

scoreboardRoutes.get('/getUserScores',getUserScoreboard)
scoreboardRoutes.get('/testUserScore',testUserScoreboard)
scoreboardRoutes.get('/getTopScores',getTopScoreboard)


export default scoreboardRoutes
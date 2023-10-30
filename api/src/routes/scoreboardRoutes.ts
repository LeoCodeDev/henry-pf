import {Router} from 'express'
import { getUserScoreboard } from '../controllers/scoreboardControllers/getUserScoreboard'
import { testUserScoreboard } from '../controllers/scoreboardControllers/testUserScoreboard'


const scoreboardRoutes = Router()

scoreboardRoutes.get('/getUserScores',getUserScoreboard)
scoreboardRoutes.get('/testUserScore',testUserScoreboard)


export default scoreboardRoutes
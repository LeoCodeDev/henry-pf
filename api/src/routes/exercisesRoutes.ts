import {Router} from 'express'
const addExercisesFromAPI = require('../controllers/exercisesControllers/postExercise')
const getExercises  = require("../controllers/exercisesControllers/getExercises");

const exercisesRoutes = Router()

exercisesRoutes.get('/postExercise', addExercisesFromAPI);
exercisesRoutes.get('/getExercises', getExercises);

export default exercisesRoutes
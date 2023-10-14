import {Router} from 'express'
const addExercisesFromAPI = require('../controllers/postExercise')
const getExercises  = require("../controllers/getExercises");

const exercisesRoutes = Router()

exercisesRoutes.get('/postExercise', addExercisesFromAPI);
exercisesRoutes.get('/getExercises', getExercises);

export default exercisesRoutes
import { Router } from "express";
const postRoutine  = require("../controllers/routinesControllers/postRoutine");
const getUserRoutines= require('../controllers/routinesControllers/getUserRoutines')
const getAllRoutines= require('../controllers/routinesControllers/getAllRoutines')
const addUserRoutine = require('../controllers/routinesControllers/addUserRoutine')
const putActiveRoutine= require('../controllers/routinesControllers/putDeleteRutine')
const putChangesInRoutine = require('../controllers/routinesControllers/putChangesInRoutine')
const deleteSavedRoutine = require('../controllers/routinesControllers/deleteSavedRoutine')
const putUserRoutineDate = require('../controllers/routinesControllers/putRoutine_users_date')
const putUserRoutineNewDate = require('../controllers/routinesControllers/putRoutine_user_newDate')
const putUserRoutineDateCheck = require('../controllers/routinesControllers/putRoutine_user_check')
const putUserRoutineDateMonth = require('../controllers/routinesControllers/putRoutine_user_date_month')
const deleteDateRoutine = require('../controllers/routinesControllers/deleteDateRoutine')


const checkToken = require('../middlewares/authentications')
const checkRole = require('../middlewares/checkRole')
const getRoutineById = require('../controllers/routinesControllers/getRoutineById')

const routinesRoutes = Router()
routinesRoutes.post('/postRoutine',postRoutine); 
routinesRoutes.post('/addUserRoutine', addUserRoutine);
routinesRoutes.get('/getAllRoutines', getAllRoutines);
routinesRoutes.put('/putDeleteRoutine',checkToken, checkRole(["Admin", "trainer"]), putActiveRoutine);
routinesRoutes.put('/putChangesInRoutine',checkToken, checkRole(["Admin", "trainer"]), putChangesInRoutine);
routinesRoutes.delete('/deleteSavedRoutine', deleteSavedRoutine);
routinesRoutes.get('/getUserRoutines', getUserRoutines);
routinesRoutes.put('/putUserRoutineDate', putUserRoutineDate);
routinesRoutes.get('/getRoutineById', getRoutineById);
routinesRoutes.put('/putUserRoutineNewDate', putUserRoutineNewDate);
routinesRoutes.put('/putUserRoutineDateMonth', putUserRoutineDateMonth);
routinesRoutes.put('/putUserRoutineCheck', putUserRoutineDateCheck);
routinesRoutes.put('/deleteDateRoutine', deleteDateRoutine);




export default routinesRoutes
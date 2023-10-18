import { Router } from "express";
const postRoutine  = require("../controllers/postRoutine");
const getUserRoutines= require('../controllers/getUserRoutines')
const getAllRoutines= require('../controllers/getAllRoutines')
const addUserRoutine = require('../controllers/addUserRoutine')
const putActiveRoutine= require('../controllers/putDeleteRutine')
const putChangesInRoutine = require('../controllers/putChangesInRoutine')
const deleteSavedRoutine = require('../controllers/deleteSavedRoutine')
const checkToken = require('../middlewares/authentications')
const checkRole = require('../middlewares/checkRole')

const routinesRoutes = Router()
routinesRoutes.post('/postRoutine',checkToken, checkRole(["Admin", "trainer"]),  postRoutine); 
routinesRoutes.post('/addUserRoutine', addUserRoutine);
routinesRoutes.get('/getAllRoutines', getAllRoutines);
routinesRoutes.put('/putDeleteRoutine',checkToken, checkRole(["Admin", "trainer"]), putActiveRoutine);
routinesRoutes.put('/putChangesInRoutine',checkToken, checkRole(["Admin", "trainer"]), putChangesInRoutine);
routinesRoutes.delete('/deleteSavedRoutine', deleteSavedRoutine);
routinesRoutes.get('/getUserRoutines', getUserRoutines);




export default routinesRoutes
import { Router } from "express";
const postRoutine  = require("../controllers/postRoutine");
const getUserRoutines= require('../controllers/getUserRoutines')
const getAllRoutines= require('../controllers/getAllRoutines')
const addUserRoutine = require('../controllers/addUserRoutine')
const putActiveRoutine= require('../controllers/putDeleteRutine')
const putChangesInRoutine = require('../controllers/putChangesInRoutine')
const deleteSavedRoutine = require('../controllers/deleteSavedRoutine')


const routinesRoutes = Router()
routinesRoutes.post('/postRoutine', postRoutine); 
routinesRoutes.post('/addUserRoutine', addUserRoutine);
routinesRoutes.get('/getAllRoutines', getAllRoutines);
routinesRoutes.put('/putDeleteRoutine', putActiveRoutine);
routinesRoutes.put('/putChangesInRoutine', putChangesInRoutine);
routinesRoutes.delete('/deleteSavedRoutine', deleteSavedRoutine);
routinesRoutes.get('/getUserRoutines', getUserRoutines);




export default routinesRoutes
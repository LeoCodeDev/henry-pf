import {Router} from 'express'
const postUser= require('../controllers/usersControllers/postUser')
const userLogin= require('../controllers/usersControllers/userLogin')
const getUser= require('../controllers/usersControllers/getUser')
const putNewPasswordUser = require("../controllers/usersControllers/putNewPasswordUser");
const getTeams = require("../controllers/usersControllers/getTeams");
const getAllFavorites = require('../controllers/usersControllers/getAllFavorites');
const postFavorite = require('../controllers/usersControllers/postFavorite');
const delFavorite = require('../controllers/usersControllers/delFavorite');
const getAllUsers= require('../controllers/usersControllers/getAllUsers')
const delImage=require('../controllers/usersControllers/delImage')
const putUser= require('../controllers/usersControllers/putUser')
const postMail= require("../controllers/usersControllers/postMail");
const tokenValidation = require('../controllers/usersControllers/tokenValidation')
const refreshToken = require('../controllers/usersControllers/refreshToken')
const deleteToken = require('../controllers/usersControllers/deleteToken')
const resetPasswordToken = require('../controllers/usersControllers/resetPasswordToken')
const getAccessTokenExpiration = require('../controllers/usersControllers/validateTokenExpiration')
const checkToken = require('../middlewares/authentications')
const manageUser = require('../controllers/usersControllers/manageUser')
// const checkRole = require('../middlewares/checkRole')
const requestIp = require('request-ip');
const lastYearUsers = require('../controllers/usersControllers/getLastYearCreationUsers');
const postTrainerReview = require('../controllers/trainersControllers/postTrainerReview')
const getTrainerReview = require('../controllers/trainersControllers/getTrainerReview')
const getAllTrainersReviews = require('../controllers/trainersControllers/getAllTrainersReviews')
const getAvgTrainerRating = require('../controllers/trainersControllers/getAverageTrainerRating')
const getAllTrainers = require('../controllers/trainersControllers/getAllTrainers')
const getTrainerRoutines = require('../controllers/trainersControllers/getTrainerRoutines')

const usersRoutes = Router()

usersRoutes.post('/login', userLogin) 
usersRoutes.post('/postUser',requestIp.mw(), postUser) 
usersRoutes.get('/getUser', getUser) 
usersRoutes.put("/newPassword/:id", checkToken, putNewPasswordUser); 
usersRoutes.get('/getAllFavorites', getAllFavorites); 
usersRoutes.post('/postFavorite', postFavorite); 
usersRoutes.delete('/delFavorite', delFavorite); 
usersRoutes.post('/delImage', delImage);
usersRoutes.put('/putUser',checkToken, putUser); 
usersRoutes.get("/getTeams", getTeams )
usersRoutes.get('/allUsers',checkToken, getAllUsers) 
usersRoutes.post("/send-email", postMail);
usersRoutes.get('/tokenValidation',tokenValidation)
usersRoutes.get('/refreshToken',refreshToken)
usersRoutes.delete('/deleteToken',deleteToken)
usersRoutes.get('/resetPasswordToken',resetPasswordToken)
usersRoutes.get('/getAccessTokenExpiration',getAccessTokenExpiration)
usersRoutes.put('/manageUser',checkToken, manageUser)
usersRoutes.get('/getLastUsers', lastYearUsers)
usersRoutes.post('/postTrainerReview',postTrainerReview)
usersRoutes.get('/getTrainerReview', getTrainerReview)
usersRoutes.get('/getAllTrainersReviews', getAllTrainersReviews)
usersRoutes.get('/getAvgTrainerRating', getAvgTrainerRating)
usersRoutes.get('/getAllTrainers', getAllTrainers)
usersRoutes.get('/getTrainerRoutines',getTrainerRoutines)

export default usersRoutes
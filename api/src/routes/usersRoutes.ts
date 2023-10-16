import {Router} from 'express'
const postUser= require('../controllers/postUser')
const userLogin= require('../controllers/userLogin')
const getUser= require('../controllers/getUser')
const putNewPasswordUser = require("../controllers/putNewPasswordUser");
const getTeams = require("../controllers/getTeams");
const getAllFavorites = require('../controllers/getAllFavorites');
const postFavorite = require('../controllers/postFavorite');
const delFavorite = require('../controllers/delFavorite');
const getAllUsers= require('../controllers/getAllUsers')
const delImage=require('../controllers/delImage')
const putUser= require('../controllers/putUser')
const postMail= require("../controllers/postMail");
const tokenValidation = require('../controllers/tokenValidation')
const refreshToken = require('../controllers/refreshToken')
const deleteToken = require('../controllers/deleteToken')
const resetPasswordToken = require('../controllers/resetPasswordToken')
const getAccessTokenExpiration = require('../controllers/validateTokenExpiration')
const checkToken = require('../middlewares/authentications')
const checkRole = require('../middlewares/checkRole')

const usersRoutes = Router()

usersRoutes.post('/login', userLogin) 
usersRoutes.post('/postUser', postUser) 
usersRoutes.get('/getUser', getUser) 
usersRoutes.put("/newPassword/:id", checkToken, putNewPasswordUser); 
usersRoutes.get('/getAllFavorites', getAllFavorites); 
usersRoutes.post('/postFavorite', postFavorite); 
usersRoutes.delete('/delFavorite', delFavorite); 
usersRoutes.post('/delImage', delImage);
usersRoutes.put('/putUser',checkToken, putUser); 
usersRoutes.get("/getTeams", getTeams )
usersRoutes.get('/allUsers', checkToken, checkRole(["Admin"]),getAllUsers) 
usersRoutes.post("/send-email", postMail);
usersRoutes.get('/tokenValidation',tokenValidation)
usersRoutes.get('/refreshToken',refreshToken)
usersRoutes.delete('/deleteToken',deleteToken)
usersRoutes.get('/resetPasswordToken',resetPasswordToken)
usersRoutes.get('/getAccessTokenExpiration',getAccessTokenExpiration)


export default usersRoutes
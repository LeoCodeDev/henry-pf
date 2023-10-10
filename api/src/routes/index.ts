const express= require('express')
const router= express.Router()
const postUser= require('../controllers/postUser')
const userLogin= require('../controllers/userLogin')
const getUser= require('../controllers/getUser')
const postProduct = require('../controllers/postProduct');
const getProducts  = require("../controllers/getProducts");
const getCategories  = require("../controllers/getCategories");
const getProductByName= require('../controllers/getProductByName')
const getProductsById = require("../controllers/getProductById");
const putNewPasswordUser = require("../controllers/putNewPasswordUser");
const getTeams = require("../controllers/getTeams");
const getAllFavorites = require('../controllers/getAllFavorites');
const postFavorite = require('../controllers/postFavorite');
const delFavorite = require('../controllers/delFavorite');
const getAllUsers= require('../controllers/getAllUsers')
const delImage=require('../controllers/delImage')
const activeDesactiveproduct = require("../controllers/putProduct");
const getAllProductsAdmin = require('../controllers/getAllproducts');
const updateProductStock= require('../controllers/stockUpdate')
const addExercisesFromAPI= require('../controllers/postExercise')
const getExercises  = require("../controllers/getExercises");
const putUser= require('../controllers/putUser')
const postRoutine  = require("../controllers/postRoutine");
const getUserRoutines= require('../controllers/getUserRoutines')
const getAllRoutines= require('../controllers/getAllRoutines')
const addUserRoutine = require('../controllers/addUserRoutine')
const postSale= require('../controllers/postSale')
const getSale= require('../controllers/getSale')
const putActiveRoutine= require('../controllers/putDeleteRutine')
const putChangesInRoutine = require('../controllers/putChangesInRoutine')
const postMail= require("../controllers/postMail");
const deleteSavedRoutine = require('../controllers/deleteSavedRoutine')
const tokenValidation= require('../controllers/tokenValidation')
const refreshToken= require('../controllers/refreshToken')
const deleteToken= require('../controllers/deleteToken')
const resetPasswordToken= require('../controllers/resetPasswordToken')
const paymentIntent = require('../controllers/paymentIntent')
const getAccessTokenExpiration= require('../controllers/validateTokenExpiration')


router.post('/postUser', postUser) 
router.post('/login', userLogin) 
router.get('/getUser', getUser) 
router.post('/postProduct', postProduct); 
router.get("/products", getProducts); 
router.get("/categories",getCategories );
router.get("/productByName",getProductByName );
router.get("/productsById", getProductsById);
router.put("/newPassword/:id", putNewPasswordUser); 
router.get("/getTeams", getTeams )
router.get('/getAllFavorites', getAllFavorites); 
router.post('/postFavorite', postFavorite); 
router.delete('/delFavorite', delFavorite); 
router.get('/allUsers', getAllUsers) 
router.post('/delImage', delImage);
router.put("/prod/:id", activeDesactiveproduct);
router.get("/allProducts", getAllProductsAdmin);
router.put('/stockUpdate', updateProductStock); 
router.get('/postExercise', addExercisesFromAPI);
router.get('/getExercises', getExercises);
router.put('/putUser', putUser); 
router.post('/postRoutine', postRoutine); 
router.get('/getUserRoutines', getUserRoutines);
router.get('/getAllRoutines', getAllRoutines);
router.post('/addUserRoutine', addUserRoutine);
router.post('/postSale', postSale);
router.post("/send-email", postMail);
router.get('/getSale', getSale);
router.put('/putDeleteRoutine', putActiveRoutine);
router.put('/putChangesInRoutine', putChangesInRoutine);
router.delete('/deleteSavedRoutine', deleteSavedRoutine);
router.post('/paymentIntent',paymentIntent)
router.get('/tokenValidation',tokenValidation)
router.get('/refreshToken',refreshToken)
router.delete('/deleteToken',deleteToken)
router.get('/resetPasswordToken',resetPasswordToken)
router.get('/getAccessTokenExpiration',getAccessTokenExpiration)




module.exports= router


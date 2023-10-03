const express= require('express')
const router= express.Router()
const postUser= require('../controllers/postUser')
const userLogin= require('../controllers/userLogin')
const getUser= require('../controllers/getUser')
const postProduct = require('../controllers/postProduct');
const  getProducts  = require("../controllers/getProducts");
const  getCategories  = require("../controllers/getCategories");
const getProductByName= require('../controllers/getProductByName')
const getProductsById = require("../controllers/getProductById");
const putNewPasswordUser = require("../controllers/putNewPasswordUser");
const getTeams = require("../controllers/getTeams");
const getAllFavorites = require('../controllers/getAllFavorites');
const postFavorite = require('../controllers/postFavorite');
const delFavorite = require('../controllers/delFavorite');
const getAllUsers= require('../controllers/getAllUsers')
const delImage=require('../controllers/delImage')



router.post('/postUser', postUser)
router.post('/login', userLogin)
router.get('/getUser', getUser)
router.post('/postProduct', postProduct);
router.get("/products", getProducts);
router.get("/categories",getCategories );
router.get("/productByName",getProductByName );
router.get("/products/:id", getProductsById);
router.put("/newPassword/:id", putNewPasswordUser);
router.get("/getTeams", getTeams )
router.get('/getAllFavorites', getAllFavorites);
router.post('/postFavorite', postFavorite);
router.post('/delImage', delImage);
router.delete('/delFavorite', delFavorite);
router.get('/allUsers', getAllUsers)








module.exports= router


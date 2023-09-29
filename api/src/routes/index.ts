const express= require('express')
const router= express.Router()
const postUser= require('../controllers/postUser')
const userLogin= require('../controllers/userLogin')
const getUser= require('../controllers/getUser')
const postProduct = require('../controllers/postProduct');
const  getProducts  = require("../controllers/getProducts");
const  getCategories  = require("../controllers/getCategories");
const getProductsById = require("../controllers/getProductById");
const putNewPasswordUser = require("../controllers/PutNewPasswordUser");



router.post('/postUser', postUser)
router.post('/login', userLogin)
router.get('/getUser', getUser)
router.post('/postProduct', postProduct);
router.get("/products", getProducts);
router.get("/categories",getCategories );
router.get("/products/:id", getProductsById);
router.put("/newPassword/:id", putNewPasswordUser);


module.exports= router


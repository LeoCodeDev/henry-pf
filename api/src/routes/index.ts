const express= require('express')
const router= express.Router()
const postTeam= require('../controllers/postTeam')
const postUser= require('../controllers/postUser')
const userLogin= require('../controllers/userLogin')
const getUser= require('../controllers/getUser')
const postProduct = require('../controllers/postProduct');
const  getProducts  = require("../controllers/getProducts");
const  getCategories  = require("../controllers/getCategories");

router.post('/postTeam', postTeam)
router.post('/postUser', postUser)
router.post('/login', userLogin)
router.get('/getUser', getUser)
router.post('/postProduct', postProduct);
router.get("/products", getProducts);
router.get("/categories",getCategories );


module.exports= router


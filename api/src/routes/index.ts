const express= require('express')
const router= express.Router()
const postUser= require('../controllers/postUser')
const userLogin= require('../controllers/userLogin')
const getUser= require('../controllers/getUser')
const postProduct = require('../controllers/postProduct');
const  getProducts  = require("../controllers/getProducts");
const  getCategories  = require("../controllers/getCategories");
<<<<<<< HEAD
const getProductByName= require('../controllers/getProductByName')
=======
const getProductsById = require("../controllers/getProductById");
const putNewPasswordUser = require("../controllers/PutNewPasswordUser");

>>>>>>> 9024459a73183218effbbf9de01d7cbb94c305a0


router.post('/postUser', postUser)
router.post('/login', userLogin)
router.get('/getUser', getUser)
router.post('/postProduct', postProduct);
router.get("/products", getProducts);
router.get("/categories",getCategories );
<<<<<<< HEAD
router.get("/productByName",getProductByName );

=======
router.get("/products/:id", getProductsById);
router.put("/newPassword/:id", putNewPasswordUser);
>>>>>>> 9024459a73183218effbbf9de01d7cbb94c305a0


module.exports= router


import {Router} from 'express'
const postProduct = require('../controllers/postProduct');
const getProducts  = require("../controllers/getProducts");
const getCategories  = require("../controllers/getCategories");
const getProductByName= require('../controllers/getProductByName')
const getProductsById = require("../controllers/getProductById");
const activeDesactiveproduct = require("../controllers/putProduct");
const getAllProductsAdmin = require('../controllers/getAllproducts');
const updateProductStock= require('../controllers/stockUpdate')
const { processImage, postImage } = require('../controllers/postImage')
// const checkToken = require('../middlewares/authentications')
// const checkRole = require('../middlewares/checkRole')


const productsRoutes = Router()

productsRoutes.post('/postProduct', postProduct); 
productsRoutes.get("/products", getProducts); 
productsRoutes.get("/categories",getCategories);
productsRoutes.get("/productByName", getProductByName );
productsRoutes.get("/productsById", getProductsById);
productsRoutes.get("/allProducts", getAllProductsAdmin);
productsRoutes.put("/prod/:id", activeDesactiveproduct);
productsRoutes.put('/stockUpdate', updateProductStock); 
productsRoutes.post('/postImage', postImage, processImage)


export default productsRoutes
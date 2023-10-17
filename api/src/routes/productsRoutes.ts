import {Router} from 'express'
import productDetailSales from '../controllers/getProductDetailSales';
const postProduct = require('../controllers/postProduct');
const getProducts  = require("../controllers/getProducts");
const getCategories  = require("../controllers/getCategories");
const getProductByName= require('../controllers/getProductByName')
const getProductsById = require("../controllers/getProductById");
const activeDesactiveproduct = require("../controllers/putProduct");
const getAllProductsAdmin = require('../controllers/getAllproducts');
const updateProductStock= require('../controllers/stockUpdate')
const postProductReview = require('../controllers/postProductReview');
const { processImage, postImage } = require('../controllers/postImage')
const getProductReviews = require('../controllers/getProductReviews');
const checkToken = require('../middlewares/authentications')
const checkRole = require('../middlewares/checkRole')


const productsRoutes = Router()

productsRoutes.post('/postProduct',checkToken,checkRole(["Trainer", "Admin"]),postProduct); 
productsRoutes.get("/products",  getProducts); 
productsRoutes.get("/categories",getCategories );
productsRoutes.get("/productByName",getProductByName );
productsRoutes.get("/productsById", getProductsById);
productsRoutes.get("/allProducts", checkToken,checkRole(["Admin"]), getAllProductsAdmin);
productsRoutes.put("/prod/:id", checkToken,checkRole(["Admin"]), activeDesactiveproduct);
productsRoutes.put('/stockUpdate', updateProductStock); 
productsRoutes.post('/postImage', postImage, processImage)
productsRoutes.get('/getProductDetailSales',productDetailSales)
productsRoutes.post('/postProductReview', postProductReview);
productsRoutes.get('/getProductReviews/:productId', getProductReviews);


export default productsRoutes
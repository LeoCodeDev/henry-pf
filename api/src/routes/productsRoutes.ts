import {Router} from 'express'
import productDetailSales from '../controllers/productsControllers/getProductDetailSales';
const postProduct = require('../controllers/productsControllers/postProduct');
const getProducts  = require("../controllers/productsControllers/getProducts");
const getCategories  = require("../controllers/productsControllers/getCategories");
const getProductByName= require('../controllers/productsControllers/getProductByName')
const getProductsById = require("../controllers/productsControllers/getProductById");
const activeDesactiveproduct = require("../controllers/productsControllers/putProduct");
const getAllProductsAdmin = require('../controllers/productsControllers/getAllproducts');
const updateProductStock= require('../controllers/productsControllers/stockUpdate')
const postProductReview = require('../controllers/productsControllers/postProductReview');
const { processImage, postImage } = require('../controllers/productsControllers/postImage')
const getProductReviews = require('../controllers/productsControllers/getProductReviews');
const checkToken = require('../middlewares/authentications')
const checkRole = require('../middlewares/checkRole')
const getProductsReports= require('../controllers/productsControllers/getProductsReports')

const productsRoutes = Router()

productsRoutes.post('/postProduct',checkToken,checkRole(["Trainer", "Admin"]),postProduct); 
productsRoutes.get("/products", getProducts);
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
productsRoutes.get('/getProductsReports', getProductsReports);

export default productsRoutes
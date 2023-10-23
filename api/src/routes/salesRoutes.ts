import {Router} from 'express'
const postSale= require('../controllers/salesControllers/postSale')
const getSale= require('../controllers/salesControllers/getSale')
const paymentIntent = require('../controllers/salesControllers/paymentIntent')
const salesMetrics = require('../controllers/salesControllers/salesMetrics')
const stockMetrics= require('../controllers/salesControllers/stockMetrics')
const userSalesMetrics= require('../controllers/salesControllers/userSalesMetrics')
const ratingMetrics= require('../controllers/salesControllers/ratingMetrics')
const getSalesByDate= require('../controllers/salesControllers/getSalesByDate')
const lastYearSales = require('../controllers/salesControllers/getSalesLastYear')
const getUserSales= require('../controllers/salesControllers/getUserSales')

const salesRoutes = Router()

salesRoutes.post('/postSale', postSale);
salesRoutes.get('/getSale', getSale);
salesRoutes.post('/paymentIntent',paymentIntent)
salesRoutes.get('/salesMetrics', salesMetrics) 
salesRoutes.get('/stockMetrics', stockMetrics)
salesRoutes.get('/userSalesMetrics', userSalesMetrics)
salesRoutes.get('/ratingMetrics', ratingMetrics)
salesRoutes.get('/getSalesByDate', getSalesByDate)
salesRoutes.get('/getLastYearSales', lastYearSales)
salesRoutes.get('/getUserSales', getUserSales)

export default salesRoutes
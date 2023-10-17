import {Router} from 'express'
const postSale= require('../controllers/postSale')
const getSale= require('../controllers/getSale')
const paymentIntent = require('../controllers/paymentIntent')
const salesMetrics = require('../controllers/salesMetrics')
const stockMetrics= require('../controllers/stockMetrics')
const userSalesMetrics= require('../controllers/userSalesMetrics')
const ratingMetrics= require('../controllers/ratingMetrics')
const getSalesByDate= require('../controllers/getSalesByDate')

const salesRoutes = Router()

salesRoutes.post('/postSale', postSale);
salesRoutes.get('/getSale', getSale);
salesRoutes.post('/paymentIntent',paymentIntent)
salesRoutes.get('/salesMetrics', salesMetrics) 
salesRoutes.get('/stockMetrics', stockMetrics)
salesRoutes.get('/userSalesMetrics', userSalesMetrics)
salesRoutes.get('/ratingMetrics', ratingMetrics)
salesRoutes.get('/getSalesByDate', getSalesByDate)

export default salesRoutes
import {Router} from 'express'
const postSale= require('../controllers/postSale')
const getSale= require('../controllers/getSale')
const paymentIntent = require('../controllers/paymentIntent')

const salesRoutes = Router()

salesRoutes.post('/postSale', postSale);
salesRoutes.get('/getSale', getSale);
salesRoutes.post('/paymentIntent',paymentIntent)

export default salesRoutes
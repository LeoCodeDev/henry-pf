import { Router } from "express";
const addCoupon= require("../controllers/addCoupon") ;
const updateCoupon= require("../controllers/updateCoupon") ;
const validateCoupon= require("../controllers/validateCoupon") ;
const getCoupons= require("../controllers/getCoupons") ;
const checkToken = require('../middlewares/authentications')
const checkRole = require('../middlewares/checkRole')

const dashboardRoutes = Router()

dashboardRoutes.post('/addCoupon',checkToken, checkRole(["Admin"]) ,addCoupon)
dashboardRoutes.put('/updateCoupon', updateCoupon)
dashboardRoutes.get('/validateCoupon', validateCoupon)
dashboardRoutes.get('/getCoupons', getCoupons)

export default dashboardRoutes
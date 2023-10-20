import { Router } from "express";
const addCoupon= require("../controllers/dashboardControllers/addCoupon") ;
const updateCoupon= require("../controllers/dashboardControllers/updateCoupon") ;
const validateCoupon= require("../controllers/dashboardControllers/validateCoupon") ;
const getCoupons= require("../controllers/dashboardControllers/getCoupons") ;
const checkToken = require('../middlewares/authentications')
const checkRole = require('../middlewares/checkRole')
const emailSender = require('../controllers/dashboardControllers/emailSender')
const getAllReports = require('../controllers/dashboardControllers/getAllReports')
const newReport = require('../controllers/dashboardControllers/postNewReport')

const dashboardRoutes = Router()

dashboardRoutes.post('/addCoupon',checkToken, checkRole(["Admin"]) ,addCoupon)
dashboardRoutes.put('/updateCoupon',checkToken, checkRole(["Admin"]) ,updateCoupon)
dashboardRoutes.get('/validateCoupon', validateCoupon)
dashboardRoutes.get('/getCoupons',checkToken, checkRole(["Admin","Trainer"]) , getCoupons)
dashboardRoutes.post('/emailSender',emailSender)
dashboardRoutes.get('/allReports',getAllReports)
dashboardRoutes.post('/createReport',newReport)

export default dashboardRoutes
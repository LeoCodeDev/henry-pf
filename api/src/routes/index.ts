const express= require('express')
const router= express.Router()
const postUser= require('../controllers/postUser')
const userLogin= require('../controllers/userLogin')
const getUser= require('../controllers/getUser')
const postProduct = require('../controllers/postProduct');


router.post('/postUser', postUser)
router.post('/login', userLogin)
router.get('/getUser', getUser)
router.post('/postProduct', postProduct);

module.exports= router
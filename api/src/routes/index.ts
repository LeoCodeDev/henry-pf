const express = require('express')
const router = express.Router()
const postProduct = require('../controllers/postProduct');


router.post('/postProduct', postProduct);



module.exports = router;
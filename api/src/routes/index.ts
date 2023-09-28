const express= require('express')
const router= express.Router()
const postTeam= require('../controllers/postTeam')
const postUser= require('../controllers/postUser')
const userLogin= require('../controllers/userLogin')
const getUser= require('../controllers/getUser')

router.post('/postTeam', postTeam)
router.post('/postUser', postUser)
router.post('/login', userLogin)
router.get('/getUser', getUser)

module.exports= router
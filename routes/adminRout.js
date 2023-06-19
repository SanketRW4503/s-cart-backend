const express = require('express')
const {loginhandle,signupadmin}= require('../controllers/adminController')
const {logoutUser } = require('../controllers/userControlller')


const router = express.Router()


router.post('/login',loginhandle)

router.post('/create-admin',signupadmin)

router.get('/logout',logoutUser)

module.exports=router;
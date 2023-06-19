const express = require('express')
const { loginhandle, signupadmin,adminloginStatus } = require('../controllers/adminController')
const { logoutUser } = require('../controllers/userControlller')
const { isUserAlreadyNotLogin, isUserAlreadyLogin } = require('../utility/utility')


const router = express.Router()


router.post('/login', isUserAlreadyNotLogin,loginhandle)
    .post('/create-admin', signupadmin)
    .get('/logout',isUserAlreadyLogin, logoutUser)
    .get('/loginStatus',adminloginStatus)

module.exports = router;
const express = require('express')
const { signupHandler, logoutUser, loginUser, getUserInfo } = require('../controllers/userControlller')
const { isUserAlreadyNotLogin, isUserAlreadyLogin } = require('../utility/utility')
const cartRout = require('./cartRout');


const router = express.Router()


router.post('/signup', isUserAlreadyNotLogin, signupHandler)
router.post('/login', isUserAlreadyNotLogin, loginUser)
router.get('/logout', isUserAlreadyLogin, logoutUser)
router.get('/myProfile', isUserAlreadyLogin, getUserInfo)

router.use('/cart', cartRout)

module.exports = router;
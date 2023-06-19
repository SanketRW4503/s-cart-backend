const express = require('express')
const {fetchAllProduct ,setProduct}= require('../controllers/productsController.js')

const { is_this_admin } = require('../utility/utility')

const router = express.Router()



router.get('/get',fetchAllProduct);

router.post('/set',is_this_admin,setProduct);

module.exports =  router;
const express = require('express')
const {fetchAllProduct ,setProduct,updateProduct}= require('../controllers/productsController.js')

const { is_this_admin } = require('../utility/utility')

const router = express.Router()



router.get('/get',fetchAllProduct);

router.post('/set',is_this_admin,setProduct);

router.post('/update',is_this_admin,updateProduct);


module.exports =  router;
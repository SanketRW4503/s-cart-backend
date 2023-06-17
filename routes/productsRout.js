const express = require('express')
const {fetchAllProduct ,setProduct}= require('../controllers/productsController.js')


const router = express.Router()



router.get('/get',fetchAllProduct);

router.post('/set',setProduct);

module.exports =  router;
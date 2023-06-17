const express= require('express');
const {add_to_cart,delete_one_item_cart,empty_cart,remove_one_item_cart} = require('../controllers/cartController')
const {  isUserAlreadyLogin } = require('../utility/utility')

const router = express.Router()

router.post('/add',isUserAlreadyLogin,add_to_cart)
.post('/delete-item-one',isUserAlreadyLogin,delete_one_item_cart)
.post('/empty-cart',isUserAlreadyLogin,empty_cart)
.post('/remove-item-one',isUserAlreadyLogin,remove_one_item_cart)



module.exports= router;
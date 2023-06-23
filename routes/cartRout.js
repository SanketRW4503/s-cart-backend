import express from 'express';
import { add_to_cart, delete_one_item_cart, empty_cart, remove_one_item_cart, get_cart_items } from '../controllers/cartController.js';
import { isUserAlreadyLogin } from '../utility/utility.js';

const router = express.Router()

router.post('/add',isUserAlreadyLogin,add_to_cart)
.post('/delete-item-one',isUserAlreadyLogin,delete_one_item_cart)
.post('/empty-cart',isUserAlreadyLogin,empty_cart)
.post('/remove-item-one',isUserAlreadyLogin,remove_one_item_cart)
.post('/get-cart-data',isUserAlreadyLogin,get_cart_items)



export default router;

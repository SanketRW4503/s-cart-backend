import express from 'express'
import { isUserAlreadyLogin, is_this_admin } from '../utility/utility.js';
import get_all_orders, { get_userorder,updateDelivaryStatus } from '../controllers/orderController.js';



const router = express.Router()

router.post('/userorder',get_userorder)
router.get('/getorders',is_this_admin,get_all_orders)
router.post('/update/delivery-status',is_this_admin,updateDelivaryStatus)


export default router;
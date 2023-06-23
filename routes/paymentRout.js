import express from 'express';
import checkoutfun from '../controllers/paymentController.js';




const router = express.Router()

router.post('/checkout',checkoutfun)



export default router;

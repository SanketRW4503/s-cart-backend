import express from 'express';
import { checkoutfun ,payment_verification}  from '../controllers/paymentController.js';




const router = express.Router()

router.post('/checkout', checkoutfun)

router.post('/verification', payment_verification)

router.get('/getkey', (req, res) => {
    res.json({ success: true, key: process.env.RAZORPAY_API_KEY })
})

export default router;

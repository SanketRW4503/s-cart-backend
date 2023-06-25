import { instance } from '../server.js';
import crypto, { Hmac } from 'crypto'






export const checkoutfun = async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: 'INR',
    }

    try {
        const order = await instance.orders.create(options);
        
        res.json({ success: true, order })
    } catch (error) {
        res.status(400).json({ success: false })
    }


}





export const payment_verification = async (req, res) => {
console.log(req.body)
const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id

    const generated_signature = crypto
    .createHmac('sha256','rzt7YdCdZJKwOEpr4JCwtJKg')
    .update(body.toString())
    .digest('hex')


    
  
    if (generated_signature === req.body.razorpay_signature) {

        res.redirect(`https://ss-kart-231bd.web.app/payment/success/${req.body.razorpay_order_id}`)
    } else{
        res.status(400).json({success:false,message:'Payment Failed'})
    } 


}









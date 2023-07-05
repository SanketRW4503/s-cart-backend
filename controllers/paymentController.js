import { instance } from '../server.js';
import crypto from 'crypto';
import { save_order_to_db } from './orderController.js';

export const checkoutfun = async (req, res) => {
  try {
    const { order_data, amount, email,address } = req.body;
    const options = {
      amount: Number(amount * 100),
      currency: 'INR',
      notes: {
        email,
        address,
        order_data: JSON.stringify(order_data)
      }
    };

    const order = await instance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const payment_verification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const generated_signature = crypto
    .createHmac('sha256', 'rzt7YdCdZJKwOEpr4JCwtJKg')
    .update(body)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    try {
      const data = await instance.orders.fetch(razorpay_order_id);
      await save_order_to_db(data, res,req,razorpay_order_id);
      
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).json({ success: false, message: 'Payment Failed' });
  }
};



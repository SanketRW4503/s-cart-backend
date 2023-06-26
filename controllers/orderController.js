import orderModel from '../models/orderModel.js';
import { empty_cart } from './cartController.js';


// this will save order to db :after success payment (this function parameters are comming from payment controller)
 export const save_order_to_db=async(data, res,req,razorpay_order_id)=>{
    const product_details = JSON.parse(data.notes.order_data);
    const orderdetails = {
      email:data.notes.email,
      order_id: data.id,
      payment_status: data.status,
      delevery_status:'Not Delivered'
      ,amount: data.amount_paid/100,
      product_details:product_details
    };
  
    try {
      const result = await orderModel.create(orderdetails);
      if (result) {
          empty_cart(req,res)
      } else {
        
  
        res.json({ success: false, message: 'Error' });
      }
    } catch (error) {
      console.log(error);
    }
  }

// it will return specific user orders
  export const get_userorder= async (req,res)=>{
    try {
        const result = await orderModel.find({email:req.body.email})
      
        if(result){
            res.json({success:true,orders:result})
        }else{
            res.json({success:false})

        }
    } catch (error) {
        res.json({success:false,error:error})
    }

  }
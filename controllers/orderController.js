import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import { empty_cart } from './cartController.js';


// this will save order to db :after success payment (this function parameters are comming from payment controller)
 export const save_order_to_db=async(data, res,req,razorpay_order_id)=>{
    const product_details = JSON.parse(data.notes.order_data);
    
    let address;
  
   try {
    const userdata = await userModel.findOne({email:data.notes.email});
    if(userdata){

      address = userdata.address
    }
   

    const orderdetails = {
      email:data.notes.email,
      address:address,
      order_id: data.id,
      payment_status: data.status,
      delevery_status:'Not Delivered'
      ,amount: data.amount_paid/100,
      product_details:product_details
    };
  
    try {
      const result = await orderModel.create(orderdetails);
      if (result) {
          empty_cart(req,res,razorpay_order_id)
      } else {
        
  
        res.json({ success: false, message: 'Error' });
      }
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log('error while fetching address '+error)
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


  export const updateDelivaryStatus= async (req,res)=>{

        try {
          const result= await orderModel.findOne({order_id:req.body.order_id})
          if(result){
            result.delevery_status=req.body.delivery_status;
            console.log(result)
            await result.save()

            res.json({success:true,message:'Product Delivary Status Updated SuccessFfully !'});

          }
        } catch (error) {
            res.json({success:false,message:'error is '+error})
        }
  }


  // this will return all orders to admin only 


async function get_all_orders(req,res){


  try {
    
    const result= await orderModel.find();
    if(result){
      res.json({success:true,result});
    }else{
      res.json({success:false,message:'No Orders Present'})
    }

  } catch (error) { 
    res.json({success:false,message:'Error is '+error})
  }

}





export default get_all_orders;
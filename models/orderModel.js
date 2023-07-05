import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema({
 
    email: {
      type: String,
      required:true,
      unique:false
    },
    order_id: {
      type: String,
      required:true
    },
    payment_status: {
      type: String,
      required:true
    },
    delevery_status: {
      type: String,
      required:true
    },
    amount: {
      type: Number,
      required:true
    },
    address: {
      type: String,
      required:true
    },
    product_details: [
 
    ],
  
});

const orderModel = model('orderModel', orderSchema);

export default orderModel;

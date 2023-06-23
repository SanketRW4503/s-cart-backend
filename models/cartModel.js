import mongoose from 'mongoose';



const cartSchema = mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique:true
    },
    products: [
        {
          price: Number,
          _id: String,
          title: String,
          price: Number,
          quantity: Number,
          description:String,
          category: String,
          imageUrl: String,
          rating:String,
        }
      ],
});



const cartModel = mongoose.model('cartModel',cartSchema)


export default cartModel
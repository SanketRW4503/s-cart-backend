const mongoose = require('mongoose')



const cartSchema = mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique:true
    },
    products: [
        {
          productId: String,
          quantity: Number,
          name: String,
          price: Number
        }
      ],
});



const cartModel = mongoose.model('cartModel',cartSchema)


module.exports= cartModel
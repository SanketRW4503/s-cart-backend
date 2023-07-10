import mongoose from "mongoose"


const wishSchema= mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    wishlist:[
        {
            product_id:String
        }
    ]
});


const wishModel = mongoose.model('wishModel',wishSchema)

export default wishModel;
const mongoose= require('mongoose')

const productsSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },rating:{
        type:String,
        required:true
    },
    addedAt:{
        type:Date,
        default: Date.now
    }
});



const productModel = mongoose.model('productsModel',productsSchema);




module.exports= productModel;

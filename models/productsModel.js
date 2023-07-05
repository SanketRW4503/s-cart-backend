import mongoose from 'mongoose';

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
    image:{
        type:Object,
        required:true
    },rating:{
        type:String,
        required:true
    },
    search_keyword:{
        type:Array,
    },
    addedAt:{
        type:Date,
        default: Date.now
    }
});



const productModel = mongoose.model('productsModel',productsSchema);




export default productModel;

import mongoose from "mongoose";



const carouselSchema= mongoose.Schema({

    name:{
        type:String,
    },
    image:{
        type:Object,
        required:true
    }
    ,
    product_id:{
        type:String
    }

})


const carouselModel = mongoose.model('carouselModel',carouselSchema)

export default carouselModel;

import mongoose from "mongoose";



const carouselSchema= mongoose.Schema({

    name:{
        type:String,
    },
    imageUrl:{
        type:String
    }
    ,
    product_id:{
        type:String
    }

})


const carouselModel = mongoose.model('carouselModel',carouselSchema)

export default carouselModel;

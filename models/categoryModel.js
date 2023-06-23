import mongoose from 'mongoose';




const categorySchema= mongoose.Schema({

    category:{
        type:String,
        required:true
    }
})



const categoryModel = mongoose.model('categoryModel',categorySchema);


export default categoryModel;
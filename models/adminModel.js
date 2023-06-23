import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



const adminSchema= mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }


});


// hashing password
adminSchema.pre('save',async function(){
    let salt =await bcrypt.genSalt()
    let hashValue= await bcrypt.hash(this.password,salt)
    this.password=hashValue;
});


const adminModel= mongoose.model('adminModel',adminSchema);


export default  adminModel;
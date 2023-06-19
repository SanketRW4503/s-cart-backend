const mongoose= require('mongoose')
const bcrypt= require('bcrypt');



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


module.exports= adminModel;
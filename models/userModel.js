import mongoose from 'mongoose';
import validator from 'email-validator';
import bcrypt from 'bcrypt';



const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },gender: {
        type: String,
        required:true
    },contact_no:{
        type:Number,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return validator.validate(this.email)// true
        }
    },
    password: {
        type: String,
        required: false,
        minLength: 8
    }, confirmpassword: {
        type: String,
        required: false,
        minLength: 8,
        validate: function () {
            return this.password === this.confirmpassword ? true : false
        }
    },address: {
        type: String,
        default:undefined
    },
});


// removing confirm password from schema
userSchema.pre('save',function(){
    this.confirmpassword=undefined
})


// hashing password
userSchema.pre('save',async function(){
    let salt= await bcrypt.genSalt();
    let hashedvalue= await bcrypt.hash(this.password,salt);
    this.password=hashedvalue
}) 



const userModel= mongoose.model('userModel',userSchema);



export default userModel
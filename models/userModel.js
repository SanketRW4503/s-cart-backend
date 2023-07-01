import mongoose from 'mongoose';
import validator from 'email-validator';



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
    }, 
    address: {
        type: String,
        default:'undefined'
    },
});







const userModel= mongoose.model('userModel',userSchema);



export default userModel
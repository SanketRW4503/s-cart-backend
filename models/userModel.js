const mongoose = require('mongoose')
const validator= require('email-validator')
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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
        required: true,
        minLength: 8
    }, confirmpassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function () {
            return this.password === this.confirmpassword ? true : false
        }
    },address: {
        type: String,
        required: false
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



module.exports= userModel
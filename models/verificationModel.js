import mongoose from "mongoose";
import validator from 'email-validator';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const verificationSchema = new mongoose.Schema({

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
        default:'undefined'
    },
    link_code:{
        type:String,
        required: false,
    },
    createdAt: {
        type:Date,
        default: new Date(),
        expires: 600
    }
    
})


// removing confirm password from schema
verificationSchema.pre('save',function(){
    this.confirmpassword=undefined
})


// hashing password
verificationSchema.pre('save',async function(){
    let salt= await bcrypt.genSalt();
    let hashedvalue= await bcrypt.hash(this.password,salt);
    this.password=hashedvalue
}) 

// saving link code
verificationSchema.pre('save',async function(){
    const uniqueId = uuidv4();
    this.link_code=uniqueId;
}) 


const verificationModel= mongoose.model('verficationModel',verificationSchema)


export default verificationModel;
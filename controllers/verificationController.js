
import { createTransport } from "nodemailer";
import { config } from 'dotenv';
import verificationModel from "../models/verificationModel.js";
import userModel from "../models/userModel.js";
import { setCookie } from "../utility/utility.js";
import { updatepassword } from "./userControlller.js";

// env setup
config({
  path: './database/config.env',
});


const transporter = createTransport({
  host: "smtp.gmail.com",

  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.PASS
  }
});

// this will send the verification link to user
export async function verificationInit(email, name, link_code, res,forgot_password) {
let html;
let subject;
  if(forgot_password==true){
   html = `<h1>Hello ${name} </h1></br><p>Set your new s-kart account password through this link :
    <a href='${process.env.FRONTEND_FORGOT_PASSWORD+link_code}'>click here</a>
    <b>Link is valid only for 15 minutes</b>
    </p>`
    subject='Forgot Password Link'
  }else{
    subject='Account Verification Link'
    html= `<h1>Hello ${name} </h1></br><p>Pleaase click on below link to verify your s-kart account :
    <a href='${process.env.BACKEND_VERIFICATION_LINK+link_code}'>verify link</a>
    <b>Link is valid only for 15 minutes</b>
  </p>`
  }


  const info = await transporter.sendMail({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: subject,
    html: html,
  });

  if (info.rejected.length == 0) {
    res.json({ success: true, message: 'Link Has been sent to your Email id' });

  } else {
    res.json({ success: false, message: 'Something went wrong ! Try Again...' });
  }

}


// verify forgot password link

async function verify_forgot_password_link(req,res){
  try {
    const result = await verificationModel.findOne({ link_code: req.params.id });
    if (result) {
      // update the password 
      await updatepassword(result,req,res);

    } else {
      res.json({ success: false, message: 'Link Expired ' })

    }
  } catch (error) {
    res.json({ success: false, message: 'Something Went Wrong !' })
  }

}





// this will verify new user 
async function verifyuser(req, res) {



  try {
    const result = await verificationModel.findOne({ link_code: req.params.id });
    if (result) {

      storeuserdata(result, res);

    } else {
      res.json({ success: false, message: 'Link Expired ' })

    }
  } catch (error) {
    res.json({ success: false, message: 'Something Went Wrong !' })
  }


}



// this will store the user to db
async function storeuserdata(result, res) {

  let userdata = {
    firstname: result.firstname,
    lastname: result.lastname,
    gender: result.gender,
    contact_no: result.contact_no,
    email: result.email,
    password: result.password
    ,address: result.address
  }



  try {

    let userdataref = await userModel.create(userdata);

    if (userdataref) {
      let redirect_status=true;
      setCookie(userdataref, res, `Verification Done ! welcome to s-kart ${userdataref.firstname}`,redirect_status);


    } else {
      res.json({ success: false, message: 'some error occured !' })
    }

  } catch (error) {
    res.json({ success: false, message: error })
  }

}

export {verifyuser,verify_forgot_password_link};




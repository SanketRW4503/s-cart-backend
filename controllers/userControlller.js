import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { setCookie, getCurrentUserID } from '../utility/utility.js';
import verificationModel from '../models/verificationModel.js';
import { verificationInit } from './verificationController.js';


async function signupHandler(req, res) {
    try {
        // check wheather any other user exists with given email id or not
        let result= await userModel.findOne({email:req.body.email});
        if(result){
            // if exists send message to user
            res.json({success:false,message:'User Already Exists with given Email Id ! Pleaase Login'})

        }else{
            const forgot_password=false;

            // check this user signup credentials are present in verification model or not 
            let result = await verificationModel.findOne({email:req.body.email})
            console.log(result)

            if(result){
                //if present send email 
                verificationInit(result.email,result.firstname,result.link_code,res,forgot_password);
            }else{
                // if details are not present in verification model then create it

                let user = await verificationModel.create(req.body);

                if(user){   
                // after creating send email 
                verificationInit(user.email,user.firstname,user.link_code,res,forgot_password);

                }
            }
           
        }

       
      


    } catch (err) {
        // if any error occur send it to user
        res.json({ success: false, meesgae:  err })
    }


}



// log out :this function will work for user and admin also
async function logoutUser(req, res) {

    try {

        let d = req.cookies.token
        if (d) {
            res.clearCookie('token', {
                secure: true, // Only send the cookie over HTTPS
                sameSite: 'none', // Allow cross-site access
            });
            res.json({ success: true, messgae: "successfully logout" })

        } else {
            res.json({ success: false, messgae: "Login First !" })
        }

    } catch (err) {
        res.json({ success: false, err });
    }


}

// login
async function loginUser(req, res) {



    try {
        let result = await userModel.findOne({ email: req.body.email })
        if (result) {
            bcrypt.compare(req.body.password, result.password).then((r) => {
                if (r) {
                    let redirect_status=false;
                    setCookie(result, res, `welcome back ${result.firstname} !`,redirect_status)

                } else {
                    res.json({ success: false, message: "INVALID EMAIL OR PASSWORD" })

                }
            })
        } else {
            res.json({ success: false, message: "INVALID EMAIL OR PASSWORD" })
        }

    } catch (error) {
        res.json({ success: false, err })

    }


}


// user profile info
async function getUserInfo(req, res) {

    try {
        let userId = getCurrentUserID(req)
        let result = await userModel.findOne({ _id: userId })
        res.json({
            success: true, profile: {
                firstname: result.firstname, lastname: result.lastname, gender: result.gender,
                contact_no: result.contact_no, email: result.email, _id: result.id
                ,address:result.address
            }
        })

    } catch (error) {
        res.json({ success: false, error })

    }

}

// this will edit the user information and save it to the db

async function edituserinfo(req, res) {

    try {

        let result = await userModel.findOne({ email: req.body.email });

        if (result !== null) {

            result.firstname = req.body.firstname;
            result.lastname = req.body.lastname;
            result.contact_no = req.body.contact_no;
            result.gender = req.body.gender;

            await result.save();

            res.json({ success: true, message: 'Profile Updated Successfully !' });
        } else {
            res.json({ success: false, message: 'User Not Found & Login Again !' });
        }
    } catch (error) {
        res.json({ success: false, message: error })
    }

}


// this function will add/update the user address 
async function add_address(req,res){
    try {
        let result = await userModel.findOne({ email: req.body.email });

        if(result!==null){
            result.address=req.body.address
            await result.save()
            res.json({success:true,message:'Address Successfully Added !'})
        }else{
            res.json({success:false,message:'Please Login Again ! Invalid Credentials'})
        }
    } catch (error) {
        res.json({success:true,error})
    }
}

// for forgot password initialization
async function forgot_password(req,res){

    try {
        const result= await userModel.findOne({email:req.body.email});
        if(result){
            const forgot_password=true;
            let userdata={
                firstname: result.firstname,
                lastname: result.lastname,
                gender: result.gender,
                contact_no: result.contact_no,
                email: result.email,
                password: result.password
                ,confirmpassword:result.confirmpassword
                ,address: result.address
            }
            let verdata = await verificationModel.findOne({email:result.email});
            if(verdata){
                verificationInit(verdata.email,verdata.firstname,verdata.link_code,res,forgot_password);

            }else{

            let user = await verificationModel.create(userdata);
            if(user){
                verificationInit(user.email,user.firstname,user.link_code,res,forgot_password);

            }
            }

        }else{
            res.json({success:false,messge:'INVALID EMAIL ID'})
        }
        
    } catch (error) {
        console.log('eeror is '+error)
    }

}

async function updatepassword(userdata,req,res){

    try {
        const result = await userModel.findOne({email:userdata.email})
        if(result){
            
            result.password=await hash_updated_pass(req?.body?.newpassword);
            await result.save();

            res.json({success:true,message:'Password Changed'})
        }else{
            res.json({success:false,messgae:'Some error occure'})
        }

    } catch (error) {
        res.json({success:false,message:error})
    }

}



async function hash_updated_pass(pass){

    let salt= await bcrypt.genSalt();
    let hashedvalue= await bcrypt.hash(pass,salt);
    return hashedvalue;
}

export {updatepassword,forgot_password, signupHandler, logoutUser, loginUser, getUserInfo, edituserinfo ,add_address};

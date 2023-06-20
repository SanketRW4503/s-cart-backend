const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');


// sets cookies
function setCookie(user, res,rec_message) {
    let token = jwt.sign({ payload: user._id },`${process.env.COOKIE_TOKEN_KEY}`);
    res.cookie('token', token, { maxAge: 1000 * 60 * 5, httpOnly: true ,
        sameSite: 'none', 
        secure: true
    })
    res.json({ success: true, message: rec_message });

}



// Returns current Login user ID
function getCurrentUserID(req) {
    try {
        decoded_payload = jwt.decode(req.cookies.token)
        return decoded_payload.payload;
    } catch (error) {
        console.log(error);
    }

}

// if user login then it will forword process to next otherwise throws error
function isUserAlreadyLogin(req, res, next) {
    try {
        let d = req.cookies.token
        if (d) {
            next()

        } else {
            res.json({ success: false, message: "Login First" })

        }

    } catch (error) {
        console.log(error);
    }


}

// if user not login then it will forword process to next otherwise throws errors

function isUserAlreadyNotLogin(req, res, next) {
    try {
        let d = req.cookies.token
        if (d) {
            res.json({ success: false, message: "user already login !" })

        } else {

            next()

        }

    } catch (error) {
        console.log(error);
    }

}



// is this admin ?

async function is_this_admin(req,res,next){
    try {
        decoded_payload = jwt.decode(req.cookies.token)
        let result = await adminModel.find({ _id: decoded_payload.payload })
        if(result){
            next();
        }
    } catch (error) {
        res.json({ success: false, message:'Authorised Admin Login Required !' })
    }

}


module.exports = { setCookie, getCurrentUserID, isUserAlreadyLogin, isUserAlreadyNotLogin ,is_this_admin};
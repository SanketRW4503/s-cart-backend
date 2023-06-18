const userModel = require('../models/userModel')

const bcrypt = require('bcrypt');
const { setCookie, getCurrentUserID } = require('../utility/utility')

async function signupHandler(req, res) {

    try {

        let user = await userModel.create(req.body);
        setCookie(user, res,'user successfully created');


    } catch (err) {
        res.json({ success: false, meesgae:"error is "+err })
    }


}



// log out 
async function logoutUser(req, res) {

    try {

        let d = req.cookies.token
        if (d) {
            res.clearCookie('token',{
            secure: true, // Only send the cookie over HTTPS
            sameSite: 'none', // Allow cross-site access
  });
            res.json({ success: true, messgae: "user successfully logout" })

        } else {
            res.json({ success: false, messgae: "user is not login ! Login First" })
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
                    setCookie(result, res,'user login success')
                   
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
        res.json({ success: true, profile: { name: result.name, email: result.email, _id: result.id } })

    } catch (error) {
        res.json({ success: false, error })

    }

}





module.exports = { signupHandler, logoutUser, loginUser, getUserInfo };
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { setCookie, getCurrentUserID } from '../utility/utility.js';


async function signupHandler(req, res) {

    try {

        let user = await userModel.create(req.body);
        setCookie(user, res, 'user successfully created');


    } catch (err) {
        res.json({ success: false, meesgae: "error is " + err })
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
                    setCookie(result, res, `welcome back ${result.name} !`)

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
        res.json({ success: true, profile: { firstname: result.firstname, lastname: result.lastname, gender: result.gender,
            contact_no:result.contact_no, email: result.email, _id: result.id } })

    } catch (error) {
        res.json({ success: false, error })

    }

}





export { signupHandler, logoutUser, loginUser, getUserInfo };

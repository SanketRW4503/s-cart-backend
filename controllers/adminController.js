import adminModel from '../models/adminModel.js';
import { setCookie } from '../utility/utility.js';

import bcrypt from 'bcrypt';



async function loginhandle(req, res) {

    try {
        result = await adminModel.find({ email: req.body.email });
      
        bcrypt.compare(req.body.password, result[0].password).then((r) => {
            if (r) {
                
                setCookie(result, res,`Welcome Admin !`)

               
            } else {
                res.json({ success: false, message: "INVALID EMAIL OR PASSWORD" })

            }
        })

    } catch (error) {
        res.json({ success: false, error })
    }



}

async function signupadmin(req, res) {
    try {
        const result = await adminModel.create(req.body);
        res.json({ success: true, message: 'welcome admin !' });
    } catch (error) {
        res.json({ success: false, error })
    }

}


async function adminloginStatus(req,res){
    try {
        let d = req.cookies.token
        if (d) {
            res.json({ success: true, message: "Admin already login !" })

        } else {
            res.json({ success: false, message: "Dear Admin please login to access your site !" })

        }

    } catch (error) {
        console.log(error);
    }
}

export { loginhandle, signupadmin, adminloginStatus };

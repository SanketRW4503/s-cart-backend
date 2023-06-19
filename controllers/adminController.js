const adminModel = require('../models/adminModel')
const { setCookie} = require('../utility/utility')

const bcrypt = require('bcrypt');



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


module.exports = { loginhandle, signupadmin }
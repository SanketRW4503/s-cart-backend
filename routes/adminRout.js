import express from 'express';
import { loginhandle, signupadmin, adminloginStatus } from '../controllers/adminController.js';
import { logoutUser } from '../controllers/userControlller.js';
import { isUserAlreadyNotLogin, isUserAlreadyLogin } from '../utility/utility.js';




const router = express.Router()


router.post('/login', isUserAlreadyNotLogin,loginhandle)
    .post('/create-admin', signupadmin)
    .get('/logout',isUserAlreadyLogin, logoutUser)
    .get('/loginStatus',adminloginStatus)

export default router;

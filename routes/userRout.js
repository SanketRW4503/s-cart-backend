import express from 'express';
import { signupHandler, logoutUser, loginUser, getUserInfo ,edituserinfo,add_address, forgot_password} from '../controllers/userControlller.js';
import { isUserAlreadyNotLogin, isUserAlreadyLogin } from '../utility/utility.js';
import cartRout from './cartRout.js';
import {verifyuser,verify_forgot_password_link} from '../controllers/verificationController.js';
// Rest of your code



const router = express.Router()


router.post('/signup', isUserAlreadyNotLogin, signupHandler);
router.post('/login', isUserAlreadyNotLogin, loginUser);
router.get('/logout', isUserAlreadyLogin, logoutUser);
router.get('/myProfile', isUserAlreadyLogin, getUserInfo);
router.post('/edit-profile', isUserAlreadyLogin, edituserinfo);
router.post('/add-address', isUserAlreadyLogin, add_address);


router.get('/verify/:id', isUserAlreadyNotLogin, verifyuser);
router.post('forgotpassword',isUserAlreadyNotLogin,forgot_password)
router.post('/forgotpassword/:id',isUserAlreadyNotLogin,verify_forgot_password_link)

router.use('/cart', cartRout)

export default router;

import express from 'express';
import { signupHandler, logoutUser, loginUser, getUserInfo ,edituserinfo,add_address} from '../controllers/userControlller.js';
import { isUserAlreadyNotLogin, isUserAlreadyLogin } from '../utility/utility.js';
import cartRout from './cartRout.js';
import verifyuser from '../controllers/verificationController.js';
// Rest of your code



const router = express.Router()


router.post('/signup', isUserAlreadyNotLogin, signupHandler);
router.post('/login', isUserAlreadyNotLogin, loginUser);
router.get('/logout', isUserAlreadyLogin, logoutUser);
router.get('/myProfile', isUserAlreadyLogin, getUserInfo);
router.post('/edit-profile', isUserAlreadyLogin, edituserinfo);
router.post('/add-address', isUserAlreadyLogin, add_address);


router.get('/verify/:id', isUserAlreadyNotLogin, verifyuser);


router.use('/cart', cartRout)

export default router;

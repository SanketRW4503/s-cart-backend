import express from 'express';
import { signupHandler, logoutUser, loginUser, getUserInfo } from '../controllers/userControlller.js';
import { isUserAlreadyNotLogin, isUserAlreadyLogin } from '../utility/utility.js';
import cartRout from './cartRout.js';

// Rest of your code



const router = express.Router()


router.post('/signup', isUserAlreadyNotLogin, signupHandler)
router.post('/login', isUserAlreadyNotLogin, loginUser)
router.get('/logout', isUserAlreadyLogin, logoutUser)
router.get('/myProfile', isUserAlreadyLogin, getUserInfo)

router.use('/cart', cartRout)

export default router;

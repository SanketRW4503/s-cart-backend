import express  from "express";
import { add_to_wishlist, get_user_wishlist } from "../controllers/wishListController.js";
import { isUserAlreadyLogin } from "../utility/utility.js";



const router= express.Router()

// this rout adds/delete product in wishlist
router.post('/add-delete-wishlist',isUserAlreadyLogin,add_to_wishlist);


// it will return user wishlist data to user
router.post('/getwishlist',get_user_wishlist);

export default router;
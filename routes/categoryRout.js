import express from 'express';
import { set_category, get_category, delete_category, update_category  ,get_admins_category} from '../controllers/categoryController.js';
import { is_this_admin } from '../utility/utility.js';

const router = express.Router();




router.post('/set-category', is_this_admin, set_category);

//this will return categories which are having products
router.get('/get-category', get_category);

//this will return all categories no matter its having products or not
router.get('/admin/get-category', get_admins_category);

router.post('/delete-category',is_this_admin,delete_category);

router.post('/update-category',is_this_admin,update_category);





export default router;

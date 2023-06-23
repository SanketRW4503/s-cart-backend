import express from 'express';
import { fetchAllProduct, setProduct, updateProduct } from '../controllers/productsController.js';
import { is_this_admin } from '../utility/utility.js';


const router = express.Router()



router.get('/get',fetchAllProduct);

router.post('/set',is_this_admin,setProduct);

router.post('/update',is_this_admin,updateProduct);


export default router;

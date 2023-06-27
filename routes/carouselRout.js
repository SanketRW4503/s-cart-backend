import  express  from "express";
import {addbanner,getallbanner }from "../controllers/carouselController.js";


const router= express.Router()


router.post('/add-banner',addbanner)

router.get('/get-all-banner',getallbanner)


export default router;
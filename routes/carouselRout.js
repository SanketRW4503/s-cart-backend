import  express  from "express";
import {addbanner,deletebanner,getallbanner }from "../controllers/carouselController.js";


const router= express.Router()


router.post('/add-banner',addbanner)

router.get('/get-all-banner',getallbanner)

router.post('/delete-banner',deletebanner)


export default router;
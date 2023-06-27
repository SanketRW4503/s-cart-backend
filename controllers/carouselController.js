import carouselModel from "../models/carouselModel.js";




export const addbanner =async (req,res)=>{

    try {
        const result = await carouselModel.create(req.body)
        if(result){
            res.json({success:true,message:'your banner is added'})
        }else{
            res.json({success:false,message:'some error occured '})
        }
    } catch (error) {
        res.json({success:false,error})
    }


}

export const getallbanner=async (req,res)=>{

    try {
        const all_banners= await carouselModel.find();

        if(all_banners){
            res.json({success:true,all_banners})
        }else{
            res.json({success:false,message:'No Carousel'})
        }

    } catch (error) {
        res.json({success:false,error})
    }

}



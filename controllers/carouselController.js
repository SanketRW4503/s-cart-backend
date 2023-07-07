import carouselModel from "../models/carouselModel.js";
import cloudinary from '../utility/cloudinary.js';




export const addbanner =async (req,res)=>{
    let carouseldata= req.body
    try {

        if(carouseldata.image){
            const cloudinaryres = await cloudinary.uploader.upload(carouseldata?.image, {
                upload_preset: 's-kart',
            });

            if(cloudinaryres){
                carouseldata.image=cloudinaryres;
                const result = await carouselModel.create(carouseldata)
                if(result){
                    res.json({success:true,message:'your banner is added'})
                }else{
                    res.json({success:false,message:'some error occured '})
                }
            }
        }

    } catch (error) {
        res.json({success:false,error})
    }


}


export const deletebanner=async (req,res)=>{

    try {
        const result = await carouselModel.deleteOne({product_id:req.body.product_id});
        

        if(result){
            cloudinary.uploader.destroy(req.body.public_id, (error, result) => {
                if (error) {
                    res.json({success:false,message:'Carousel Deleted Successfully ! Image could not delete '})
                } else {
                    res.json({success:true,message:'Carousel Deleted Successfully !'})
                }
              });
        }else{
            res.json({success:false,message:'Carousel Not Found !'})
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



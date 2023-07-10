import wishModel from "../models/wishlistModel.js";



async function add_to_wishlist(req,res){
    try {
            let userexists= await wishModel.findOne({email:req.body.email});
            if(userexists){

               let itemIndex = userexists.wishlist.findIndex((p) => p?.product_id == req?.body?.product_id);
                if(itemIndex!==-1){
                    userexists?.wishlist?.splice(itemIndex, 1);
                    await userexists.save();
                    res.json({success:true,message:'Product Removed from Wishlist !',add:false});
                }else{
                    userexists.wishlist.push({product_id:req.body.product_id});
                    await userexists.save();
                    res.json({success:true,message:'Product Added to WishList',add:true});
                }

            }else{
                let dataset={email:req.body.email,wishlist:[{product_id:req.body.product_id}]}
                const result= await wishModel.create(dataset);
                if(result){
                    res.json({success:true,message:'Product Added To WishList !',add:true})
                }else{
                    res.json({success:false,message:'Some Error Occur!'})
                }
            }

         
    } catch (error) {
        res.json({success:false,message:'ERR'+error})
    }

}


async function get_user_wishlist(req,res){

    try {
            const result= await wishModel.findOne({email:req.body.email})
            if(result){
                res.json({success:true,result})
            }else{
                res.json({success:false,message:'User Not Found !'})
            }
    } catch (error) {
        res.json({success:false,message:error})
    }

}



export{add_to_wishlist,get_user_wishlist};

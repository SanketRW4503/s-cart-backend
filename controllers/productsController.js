import categoryModel from '../models/categoryModel.js';
import productModel from '../models/productsModel.js';
import cloudinary from '../utility/cloudinary.js';


// no authentication required
async function fetchAllProduct(req, res) {
    try {

        let items = await productModel.find();
        if (items) {
          
                res.json({ success: true, items })

            }

        



    } catch (err) {

        res.json({ success: false, message:'error is'+err });
    }

}


async function setProduct(req, res) {
    let productdata = req.body
    try {

        if (productdata?.image) {
            const cloudinaryres = await cloudinary.uploader.upload(productdata?.image, {
                upload_preset: 's-kart',
                width: 800, 
                height: 800
            })

            if (cloudinaryres) {
                productdata.image = cloudinaryres;
                let d = await productModel.create(productdata)
                res.json({ success: true, message: 'Products Successfully added !' });

            } else {
                res.json({ success: false, message: 'image fail' })
            }
        }


    } catch (err) {
        res.json({ success: false, err });
    }

}

async function updateProduct(req, res) {

    try {
        let result = await productModel.findById({ _id: req.body.productid })
        if (result !== null) {
            console.log(req.body.updatedata)
            result.title = req.body.updatedata.title;
            result.category = req.body.updatedata.category;
            result.imageUrl = req.body.updatedata.imageUrl;
            result.price = req.body.updatedata.price;
            result.quantity = req.body.updatedata.quantity;
            result.rating = req.body.updatedata.rating;
            result.description = req.body.updatedata.description;

            result = await result.save()
            res.json({ success: true, message: 'Product Sucessfully Updated !' })
        } else {
            res.json({ success: false, message: 'Some Error Occured' })
        }

    } catch (error) {

        res.json({ success: false, error })
    }
}



// this will delete the products
async function delete_product(req,res){

    try {
        const result = await productModel.deleteOne({_id:req.body._id});
        if(result){
            cloudinary.uploader.destroy(req.body.public_id, (error, result) => {
                if (error) {
                    res.json({success:false,message:'Product Deleted Successfully ! Image could not delete '})
                } else {
                    res.json({success:true,message:'Product Deleted Successfully !'})
                }
              });
        }else{
            res.json({success:false,message:'Product Not Found !'})
        }
    } catch (error) {
        res.json({success:false,message:'error'+error})
    }

}


export { fetchAllProduct, setProduct, updateProduct ,delete_product};

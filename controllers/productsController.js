import categoryModel from '../models/categoryModel.js';
import productModel from '../models/productsModel.js';
import cloudinary from '../utility/cloudinary.js';


// no authentication required
async function fetchAllProduct(req, res) {
    try {

        let products = await productModel.find();
        if (products) {
            let allcollection = await categoryModel.find();
            if (allcollection) {
                let items = []
                for (let i = 0; allcollection.length !== i; i++) {
                    let data = products.filter((p) => p.category == allcollection[i].category)
                    items.push(data);
                }
                res.json({ success: true, items })

            }

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
            })

            if (cloudinaryres) {
                productdata.image = cloudinaryres;
                console.log(productdata)
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

export { fetchAllProduct, setProduct, updateProduct };

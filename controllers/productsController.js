const productModel = require('../models/productsModel')


// no authentication required
async function fetchAllProduct(req, res) {
    try {

        let items = await productModel.find()
        res.json({ success: true, items })

    } catch (err) {

        res.json({ success: false, err });
    }

}


async function setProduct(req, res) {

    try {
        let d = await productModel.create(req.body)

        res.json({ success: true, message: 'Products Successfully added !' });

    } catch (err) {
        res.json({ success: false, err });
    }

}

async function updateProduct(req,res){
    
    try {
        let result = await productModel.findById({_id:req.body.productid})
        console.log(result)
        if(result!==null){
            console.log(req.body.updatedata)
            result.title=req.body.updatedata.title;        
            result.category=req.body.updatedata.category;
            result.imageUrl=req.body.updatedata.imageUrl;
            result.price=req.body.updatedata.price;
            result.quantity=req.body.updatedata.quantity;
            result.rating=req.body.updatedata.rating;
            result.description=req.body.updatedata.description;

            result= await result.save()
            res.json({success:true,message:'Product Sucessfully Updated !'})
        }else{
            res.json({success:false,message:'Some Error Occured'})
        }
        
    } catch (error) {   

        res.json({success:false,error})
    }
}

module.exports = { fetchAllProduct, setProduct ,updateProduct}

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
        let result = await productModel.findOne({_id:req.body.productid})
        if(result!==null){
            
            result=req.body.updatedata;

            result= await result.save()
            res.json({success:true,message:'Product Sucessfully Updated !'})
        }
        
    } catch (error) {   

        res.json({success:false,error})
    }
}

module.exports = { fetchAllProduct, setProduct ,updateProduct}

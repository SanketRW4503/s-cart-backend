const categoryModel = require("../models/categoryModel")



// SET CATEGORY :only admin can set the category
async function set_category(req, res) {

    try {
        const already_exits = await categoryModel.findOne({ category: req.body.category })

        if (already_exits == null) {
            const result = await categoryModel.create(req.body)
            if (result !== null) {
                res.json({ success: true, message: 'Category Successfully Added !' });
            }
        } else {
            res.json({ success: false, message: 'Category Already Exists !' })
        }

    } catch (error) {
        res.json({ success: false, message: 'Some Error Occured !' })
    }

}


// GET all CATEGORY
async function get_category(req,res) {
    try {

        const allcollection = await categoryModel.find()

        res.json({ success: true, allcollection })
    } catch (error) {

        res.json({ success: false, message: 'SOME ERROR OCCURED !' })
    }
}


// delete category

async function delete_category(req,res){

    try {
        const result= await categoryModel.deleteOne({category:req.body.category});
        if(result.deletedCount==1){
            res.json({success:true,message:'Category Successfully Deleted !'})
        }else{
            res.json({success:false,message:'Category Not Found!'})

        }
    } catch (error) {
        res.json({success:false,error})
    }
}


// update category name

async function update_category(req,res){

    try {
        const result= await categoryModel.findOne({category:req.body.category});
        console.log(result)
        if(result!==null){
            result.category=req.body.newcategory
            const status = await result.save();
            if(status!==null){
                res.json({success:true,message:'Category Updated Successfully !'})
            }else{
                res.json({success:true,message:'some error occur... try again !'})

            }
        
        }else{
            res.json({success:true,message:'requested category to update not found !'})

        }
        

    } catch (error) {
        res.json({success:false,error})
    }
}

module.exports = { set_category, get_category,delete_category,update_category }
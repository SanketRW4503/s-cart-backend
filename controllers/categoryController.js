const categoryModel = require("../models/categoryModel")



// SET CATEGORY :only admin can set the category
async function set_category(req, res) {

    try {
        const already_exits = await categoryModel.findOne({ category: req.body.category })

        if (already_exits == null) {
            const result = await categoryModel.create(req.body)
            if (result !== null) {
                res.json({ sucess: true, message: 'Category Successfully Added !' });
            }
        } else {
            res.json({ sucess: false, message: 'Category Already Exists !' })
        }

    } catch (error) {
        res.json({ sucess: false, message: 'Some Error Occured !' })
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

module.exports = { set_category, get_category }
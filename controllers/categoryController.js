import categoryModel from '../models/categoryModel.js';
import productModel from '../models/productsModel.js';



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
async function get_category(req, res) {
    try {

        const allcollection = await categoryModel.find()
        if (allcollection) {
            const products = await productModel.find();
            if (products) {
                let items = [];
                for (let i = 0; products.length !== i; i++) {
                    let data = allcollection.filter((p) => p.category == products[i].category)
                    items.push(data[0])

                }
                const categoryset = [...new Set(items)];

                res.json({ success: true, categoryset })

            }
        }
    } catch (error) {

        res.json({ success: false, message: 'ERROR IS:' + error })
    }
}


// get category for admin
async function get_admins_category(req, res) {

    try {
        const allcollections = await categoryModel.find();
        if (allcollections) {
            res.json({ success: true, allcollections })
        }
    } catch (error) {
        res.json({ success: false, messge: 'error' + error })
    }

}

// delete category

async function delete_category(req, res) {

    try {
        const result = await categoryModel.deleteOne({ category: req.body.category });
        if (result.deletedCount == 1) {
            res.json({ success: true, message: 'Category Successfully Deleted !' })
        } else {
            res.json({ success: false, message: 'Category Not Found!' })

        }
    } catch (error) {
        res.json({ success: false, error })
    }
}


// update category name

async function update_category(req, res) {

    try {
        const result = await categoryModel.findOne({ category: req.body.category });
        console.log(result)
        if (result !== null) {
            result.category = req.body.newcategory
            const status = await result.save();
            if (status !== null) {
                res.json({ success: true, message: 'Category Updated Successfully !' })
            } else {
                res.json({ success: true, message: 'some error occur... try again !' })

            }

        } else {
            res.json({ success: true, message: 'requested category to update not found !' })

        }


    } catch (error) {
        res.json({ success: false, error })
    }
}

export { get_admins_category, set_category, get_category, delete_category, update_category };

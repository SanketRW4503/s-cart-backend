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

module.exports = { fetchAllProduct, setProduct }

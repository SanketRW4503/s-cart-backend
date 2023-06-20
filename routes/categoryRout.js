const express = require('express')
const { set_category, get_category,delete_category } = require('../controllers/categoryController')
const { is_this_admin } = require('../utility/utility')

const router = express.Router()

router.post('/set-category', is_this_admin, set_category);

router.get('/get-category', get_category);

router.post('/delete-category',is_this_admin,delete_category);





module.exports = router
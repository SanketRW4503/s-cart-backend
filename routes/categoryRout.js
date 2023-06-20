const express = require('express')
const { set_category, get_category } = require('../controllers/categoryController')
const { is_this_admin } = require('../utility/utility')

const router = express.Router()

router.post('/set-category', is_this_admin, set_category);

router.get('/get-category', get_category);






module.exports = router
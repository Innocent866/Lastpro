const express = require('express');
const router = express.Router()
const { insertMany, createproduct, deleteMany, singleproduct, allproduct } = require('../controller/productController')

// create many products route
router.post('/many', insertMany)
router.post('/product',createproduct)
router.delete('/many',deleteMany)
router.get('/:productId',singleproduct)
router.get('/',allproduct)

module.exports = router
const express = require('express');
const router = express.Router();

const { getProductsByCategory, getProductsById } = require('../controllers/products');

router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductsById);

module.exports = router;

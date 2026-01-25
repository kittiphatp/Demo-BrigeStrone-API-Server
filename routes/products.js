const express = require('express');
const router = express.Router();

const { getProductsByCategory } = require('../controllers/products');

router.get('/:category', getProductsByCategory);

module.exports = router;
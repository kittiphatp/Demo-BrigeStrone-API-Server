const express = require('express');
const router = express.Router();

const { getProductsByCategory } = require('../controllers/products');

router.get('/category/:category', getProductsByCategory);


module.exports = router;

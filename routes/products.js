const express = require('express');
const router = express.Router();

const { getProductsByCategory } = require('../controllers/products');

router.get('/', getProductsByCategory);

module.exports = router;
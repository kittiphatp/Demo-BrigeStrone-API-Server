const express = require('express');
const router = express.Router();

const { createCart, addItemtoCart, deleteCart } = require('../controllers/carts');

router.post('/', createCart);
router.post('/add-item', addItemtoCart);
router.delete('/:customer_id', deleteCart);

module.exports = router;
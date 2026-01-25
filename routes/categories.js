const express = require('express');
const router = express.Router();

const { getListCategories } = require('../controllers/categories');

router.get('/', getListCategories);

module.exports = router;
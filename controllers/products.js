const getProductsByCategory = (req, res) => {
    const category = req.params.category;
    const products = require('../data/products.json');
    const filteredProducts = products.filter(product => product.category === category);
    res.json(filteredProducts);
}

module.exports = {
    getProductsByCategory
}
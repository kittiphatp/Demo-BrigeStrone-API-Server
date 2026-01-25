const getProductsByCategory = (req, res) => {
    const category = req.params.category;
    const products = require('../data/products.json');
    const filteredProducts = products.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        res.status(404).json({ message: "No products found for this category" });
    } else {
        res.status(200).json(filteredProducts);
    }
}

const getProductsById = (req, res) => {
    const id = req.params.id;
    const products = require('../data/products.json');
    const product = products.find(product => product.id === parseInt(id));

    if (!product) {
        res.status(404).json({ message: "Product not found" });
    } else {
        res.status(200).json(product);
    }
}

module.exports = {
    getProductsByCategory,
    getProductsById
}

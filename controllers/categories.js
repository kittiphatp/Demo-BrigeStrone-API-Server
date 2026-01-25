const getListCategories = (req, res) => {
    const list = require('../data/category-list.json');
    res.status(200).json(list);
}

module.exports = {
    getListCategories
}
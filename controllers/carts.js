const fs = require('fs');
const path = require('path');

function getProductImageById(id) {
    try {
        const filePath = path.join(process.cwd(), 'data', 'products.json');
        const data = fs.readFileSync(filePath, 'utf8');
        const products = JSON.parse(data);
        const product = products.find(item => item.id === Number(id));
        return product ? product.img : "Product not found";        
    } catch (err) {
        console.error("Error reading file:", err);
        return null;
    }
}

const createCart = (req, res) => {
    try {
        const { customer_id, product_id, product_name, quantity, price } = req.body;
        const cartPath = path.join('/tmp', `${customer_id}.json`);
        const img = getProductImageById(product_id);
        let cart = {
            "customer_id": customer_id,
            "product": [
                {
                    "product_id": product_id,
                    "product_name": product_name,
                    "unit_price": price,
                    "quantity": quantity,
                    "price": price * quantity,
                    "img": img,
                }
            ],
            "total_quantity": quantity,
            "total_price": quantity * price,
            "html_table": `<table style='width:500px; border: 1px solid black; border-collapse: collapse;'><tr><th style='border: 1px solid black; background-color: #aaa;'>Product Name</th><th style='border: 1px solid black; background-color: #aaa;'>Unit Price</th><th style='border: 1px solid black; background-color: #aaa;'>Quantity</th><th style='border: 1px solid black; background-color: #aaa;'>Price</th><th style='border: 1px solid black; background-color: #aaa;'>Image</th></tr><tr><td style='border: 1px solid black;'>${product_name}</td><td style='border: 1px solid black; text-align: center;'>${price}</td><td style='border: 1px solid black; text-align: center;'>${quantity}</td><td style='border: 1px solid black; text-align: center;'>${price * quantity}</td><td style='border: 1px solid black; text-align: center;'><img src='${img}' alt='${img}' height='150px' /></td></tr><tr><td style='border: 1px solid black; background-color: #aaa;'>Total</td><td style='border: 1px solid black; background-color: #aaa; text-align: center;'></td><td style='border: 1px solid black; background-color: #aaa; text-align: center;'>${quantity}</td><td style='border: 1px solid black; background-color: #aaa; text-align: center'>${quantity * price}</td><td style='border: 1px solid black; background-color: #aaa; text-align: center'></td></tr></table>`
        };
        fs.writeFileSync(cartPath, JSON.stringify(cart));
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addItemtoCart = (req, res) => {
    try {
        const { customer_id, product_id, product_name, quantity, price } = req.body;
        const cartPath = path.join('/tmp', `${customer_id}.json`);
        fs.readFile(cartPath, 'utf8', (err, data) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                const data_json = JSON.parse(data);
                let product_arr = data_json.product;

                let isExistingProduct = product_arr.find(item => item.product_id === product_id && item.unit_price === price);
                if (isExistingProduct) {
                    product_arr.map(item => {
                        if (item.product_id === product_id && item.unit_price === price) {
                            item.quantity = Number(item.quantity) + Number(quantity);
                            item.price = Number(item.quantity) * Number(price);
                        }
                    });
                } else {
                    const img = getProductImageById(product_id);
                    product_arr.push(
                        { product_id, product_name, unit_price: price, quantity , price: price * quantity , img: img }
                    );
                }

                let cart = {
                    "customer_id": customer_id,
                    "product": product_arr,
                    "total_quantity": product_arr.reduce((total, product) => Number(total) + Number(product.quantity), 0),
                    "total_price": product_arr.reduce((total, product) => Number(total) + Number(product.unit_price) * Number(product.quantity), 0),
                    "html_table": `<table style='width:300px; border: 1px solid black; border-collapse: collapse;'><tr><th style='border: 1px solid black; background-color: #aaa;'>Product Name</th><th style='border: 1px solid black; background-color: #aaa;'>Unit Price</th><th style='border: 1px solid black; background-color: #aaa;'>Quantity</th><th style='border: 1px solid black; background-color: #aaa;'>Price</th></tr>${product_arr.map(item => `<tr><td style='border: 1px solid black;'>${item.product_name}</td><td style='border: 1px solid black; text-align: center;'>${item.unit_price}</td><td style='border: 1px solid black; text-align: center;'>${item.quantity}</td><td style='border: 1px solid black; text-align: center;'>${item.price}</td></tr>`).join('')}<td style='border: 1px solid black; background-color: #aaa;'>Total</td><td style='border: 1px solid black; background-color: #aaa; text-align: center;'></td><td style='border: 1px solid black; background-color: #aaa; text-align: center;'>${product_arr.reduce((total, product) => total + product.quantity, 0)}</td><td style='border: 1px solid black; background-color: #aaa; text-align: center'>${product_arr.reduce((total, product) => total + product.price * product.quantity, 0)}</td></tr></table>`
                };

                fs.writeFileSync(cartPath, JSON.stringify(cart));
                res.status(200).json(cart);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCart = (req, res) => {
    try {
        const customer_id = req.params.customer_id;
        const cartPath = path.join('/tmp', `${customer_id}.json`);
        fs.unlinkSync(cartPath);
        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCart,
    addItemtoCart,
    deleteCart
}





















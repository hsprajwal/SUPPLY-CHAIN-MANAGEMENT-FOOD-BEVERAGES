const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001; // Change the port number here

app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Default password for XAMPP MySQL is empty
    database: 'prajwal'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Add or update a supplier and products
app.post('/suppliers', (req, res) => {
    const { name, email, phone, address, products } = req.body;

    // Check if supplier exists
    const checkSupplierSql = 'SELECT id FROM suppliers WHERE name = ? AND email = ? AND phone = ? AND address = ?';
    db.query(checkSupplierSql, [name, email, phone, address], (err, results) => {
        if (err) {
            console.error('Error checking supplier:', err);
            return res.status(500).json({ error: 'Failed to check supplier' });
        }

        let supplierId;
        if (results.length > 0) {
            // Supplier exists
            supplierId = results[0].id;
        } else {
            // Insert new supplier
            const insertSupplierSql = 'INSERT INTO suppliers (name, email, phone, address) VALUES (?, ?, ?, ?)';
            db.query(insertSupplierSql, [name, email, phone, address], (err, result) => {
                if (err) {
                    console.error('Error inserting supplier:', err);
                    return res.status(500).json({ error: 'Failed to save supplier' });
                }
                supplierId = result.insertId;
            });
        }

        // Process products
        products.forEach(product => {
            const { productName, productCategory, productQuantity, productPrice, productTotalPrice } = product;

            // Check if product exists for this supplier
            const checkProductSql = 'SELECT id, product_quantity, product_total_price FROM supplier_products WHERE supplier_id = ? AND product_name = ? AND product_category = ? AND product_price = ?';
            db.query(checkProductSql, [supplierId, productName, productCategory, productPrice], (err, results) => {
                if (err) {
                    console.error('Error checking product:', err);
                    return res.status(500).json({ error: 'Failed to check product' });
                }

                if (results.length > 0) {
                    // Product exists, update quantity and total price
                    const existingProduct = results[0];
                    const newQuantity = existingProduct.product_quantity + productQuantity;
                    const newTotalPrice = existingProduct.product_total_price + productTotalPrice;
                    const updateProductSql = 'UPDATE supplier_products SET product_quantity = ?, product_total_price = ? WHERE id = ?';
                    db.query(updateProductSql, [newQuantity, newTotalPrice, existingProduct.id], (err, result) => {
                        if (err) {
                            console.error('Error updating product:', err);
                            return res.status(500).json({ error: 'Failed to update product' });
                        }
                    });
                } else {
                    // Insert new product
                    const insertProductSql = 'INSERT INTO supplier_products (supplier_id, product_name, product_category, product_quantity, product_price, product_total_price) VALUES (?, ?, ?, ?, ?, ?)';
                    db.query(insertProductSql, [supplierId, productName, productCategory, productQuantity, productPrice, productTotalPrice], (err, result) => {
                        if (err) {
                            console.error('Error inserting product:', err);
                            return res.status(500).json({ error: 'Failed to save product' });
                        }
                    });
                }
            });
        });

        res.json({ message: 'Supplier and products processed successfully' });
    });
});

// Fetch all suppliers
app.get('/suppliers', (req, res) => {
    const sql = `
        SELECT s.id, s.name, s.email, s.phone, s.address, 
               sp.product_name, sp.product_category, sp.product_quantity, sp.product_price, sp.product_total_price
        FROM suppliers s
        LEFT JOIN supplier_products sp ON s.id = sp.supplier_id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching suppliers data:', err);
            return res.status(500).json({ error: 'Failed to fetch suppliers data' });
        }
        const suppliers = results.reduce((acc, row) => {
            const { id, name, email, phone, address, product_name, product_category, product_quantity, product_price, product_total_price } = row;
            if (!acc[id]) {
                acc[id] = { id, name, email, phone, address, products: [] };
            }
            if (product_name) {
                acc[id].products.push({ product_name, product_category, product_quantity, product_price, product_total_price });
            }
            return acc;
        }, {});
        res.json(Object.values(suppliers));
    });
});

// Delete a supplier
app.delete('/suppliers/:id', (req, res) => {
    const supplierId = req.params.id;
    console.log(`Received request to delete supplier with ID: ${supplierId}`);

    // Delete products associated with the supplier
    const deleteProductsSql = 'DELETE FROM supplier_products WHERE supplier_id = ?';
    db.query(deleteProductsSql, [supplierId], (err, result) => {
        if (err) {
            console.error('Error deleting products:', err);
            return res.status(500).json({ error: 'Failed to delete products' });
        }
        console.log(`Deleted products associated with supplier ID: ${supplierId}`);
        console.log(`Number of products deleted: ${result.affectedRows}`);

        // Delete the supplier
        const deleteSupplierSql = 'DELETE FROM suppliers WHERE id = ?';
        db.query(deleteSupplierSql, [supplierId], (err, result) => {
            if (err) {
                console.error('Error deleting supplier:', err);
                return res.status(500).json({ error: 'Failed to delete supplier' });
            }
            console.log(`Deleted supplier with ID: ${supplierId}`);
            console.log(`Number of suppliers deleted: ${result.affectedRows}`);
            res.json({ message: 'Supplier deleted successfully' });
        });
    });
});

// Route to mark an order as paid
app.post('/orders/:id/pay', (req, res) => {
    const orderId = req.params.id;
    const updateOrderSql = 'UPDATE orders SET paid = TRUE WHERE id = ?';

    db.query(updateOrderSql, [orderId], (err, result) => {
        if (err) {
            console.error('Error marking order as paid:', err);
            return res.status(500).json({ error: 'Failed to mark order as paid' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order marked as paid successfully' });
    });
});

// Route to fetch reports data
app.get('/reports', (req, res) => {
    const reportData = {
        totalInventoryAmount: 0,
        totalAmountReceived: 0,
        totalOrderedItems: 0,
        totalOrderAmount: 0,
        unpaidOrders: [],
        paidOrders: []
    };

    const inventorySql = 'SELECT SUM(price * quantity) AS totalInventoryAmount FROM inventory';
    const ordersSql = 'SELECT SUM(price * quantity) AS totalAmountReceived, SUM(quantity) AS totalOrderedItems, SUM(price * quantity) AS totalOrderAmount FROM orders WHERE paid = TRUE';
    const unpaidOrdersSql = 'SELECT product_name AS productName, category, price, quantity FROM orders WHERE paid = FALSE';
    const paidOrdersSql = 'SELECT product_name AS productName, category, price, quantity FROM orders WHERE paid = TRUE';

    db.query(inventorySql, (err, inventoryResult) => {
        if (err) {
            console.error('Error fetching inventory data:', err);
            return res.status(500).json({ error: 'Failed to fetch inventory data' });
        }
        reportData.totalInventoryAmount = inventoryResult[0].totalInventoryAmount || 0;

        db.query(ordersSql, (err, ordersResult) => {
            if (err) {
                console.error('Error fetching orders data:', err);
                return res.status(500).json({ error: 'Failed to fetch orders data' });
            }
            reportData.totalAmountReceived = ordersResult[0].totalAmountReceived || 0;
            reportData.totalOrderedItems = ordersResult[0].totalOrderedItems || 0;
            reportData.totalOrderAmount = ordersResult[0].totalOrderAmount || 0;

            db.query(unpaidOrdersSql, (err, unpaidOrdersResult) => {
                if (err) {
                    console.error('Error fetching unpaid orders data:', err);
                    return res.status(500).json({ error: 'Failed to fetch unpaid orders data' });
                }
                reportData.unpaidOrders = unpaidOrdersResult;

                db.query(paidOrdersSql, (err, paidOrdersResult) => {
                    if (err) {
                        console.error('Error fetching paid orders data:', err);
                        return res.status(500).json({ error: 'Failed to fetch paid orders data' });
                    }
                    reportData.paidOrders = paidOrdersResult;
                    res.json(reportData);
                });
            });
        });
    });
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Fetch inventory data
app.get('/inventory', (req, res) => {
    const sql = 'SELECT * FROM inventory';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching inventory data:', err);
            return res.status(500).json({ error: 'Failed to fetch inventory data' });
        }
        res.json(results);
    });
});

// Fetch a single product
app.get('/inventory/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM inventory WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ error: 'Failed to fetch product' });
        }
        res.json(result[0]);
    });
});

// Update the POST route for adding a product
app.post('/inventory', (req, res) => {
    const { product_name, category, quantity, price, total_price } = req.body;

    // Check if the product already exists with the same name and price
    const checkProductSql = 'SELECT id, quantity, total_price FROM inventory WHERE product_name = ? AND price = ?';
    db.query(checkProductSql, [product_name, price], (err, results) => {
        if (err) {
            console.error('Error checking product:', err);
            return res.status(500).json({ error: 'Failed to check product' });
        }

        if (results.length > 0) {
            // Product exists, update the quantity and total price
            const existingProduct = results[0];
            const newQuantity = existingProduct.quantity + quantity;
            const newTotalPrice = existingProduct.total_price + total_price;

            const updateProductSql = 'UPDATE inventory SET quantity = ?, total_price = ? WHERE id = ?';
            db.query(updateProductSql, [newQuantity, newTotalPrice, existingProduct.id], (err, result) => {
                if (err) {
                    console.error('Error updating product:', err);
                    return res.status(500).json({ error: 'Failed to update product' });
                }
                res.json({ id: existingProduct.id, product_name, category, quantity: newQuantity, price, total_price: newTotalPrice });
            });
        } else {
            // Product does not exist, insert a new row
            const insertProductSql = 'INSERT INTO inventory (product_name, category, quantity, price, total_price) VALUES (?, ?, ?, ?, ?)';
            db.query(insertProductSql, [product_name, category, quantity, price, total_price], (err, result) => {
                if (err) {
                    console.error('Error adding product:', err);
                    return res.status(500).json({ error: 'Failed to add product' });
                }
                res.json({ id: result.insertId, product_name, category, quantity, price, total_price });
            });
        }
    });
});

// Update a product in inventory
app.put('/inventory/:id', (req, res) => {
    const { id } = req.params;
    const { product_name, category, quantity, price, total_price } = req.body;
    const sql = 'UPDATE inventory SET product_name = ?, category = ?, quantity = ?, price = ?, total_price = ? WHERE id = ?';
    db.query(sql, [product_name, category, quantity, price, total_price, id], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ error: 'Failed to update product' });
        }
        res.json({ message: 'Product updated' });
    });
});

// Delete a product from inventory
app.delete('/inventory/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM inventory WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ error: 'Failed to delete product' });
        }
        res.json({ message: 'Product deleted' });
    });
});

// Fetch orders data
app.get('/orders', (req, res) => {
    const sql = 'SELECT id, product_name AS productName, category, price, quantity, paid FROM orders';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching orders data:', err);
            return res.status(500).json({ error: 'Failed to fetch orders data' });
        }
        res.json(results);
    });
});

// Add a new order
app.post('/orders', (req, res) => {
    const orders = req.body;
    const sql = 'INSERT INTO orders (product_name, category, price, quantity, paid) VALUES ?';
    const values = orders.map(order => [order.productName, order.category, order.price, order.quantity, order.paid]);

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error adding order:', err);
            return res.status(500).json({ error: 'Failed to add order' });
        }
        res.json({ message: 'Order placed successfully', orderIds: result.insertId });
    });
});

// Update order status
app.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const { paid } = req.body;
    const sql = 'UPDATE orders SET paid = ? WHERE id = ?';
    db.query(sql, [paid, id], (err, result) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).json({ error: 'Failed to update order status' });
        }
        res.json({ message: 'Order status updated' });
    });
});

// Delete an order
app.delete('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    const deleteOrderSql = 'DELETE FROM orders WHERE id = ?';

    db.query(deleteOrderSql, [orderId], (err, result) => {
        if (err) {
            console.error('Error deleting order:', err);
            return res.status(500).json({ error: 'Failed to delete order' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    });
});

// Add or update a supplier and products
app.post('/suppliers', (req, res) => {
    const { name, email, phone, address, products } = req.body;

    // Check if supplier exists
    const checkSupplierSql = 'SELECT id FROM suppliers WHERE name = ? AND email = ? AND phone = ? AND address = ?';
    db.query(checkSupplierSql, [name, email, phone, address], (err, results) => {
        if (err) {
            console.error('Error checking supplier:', err);
            return res.status(500).json({ error: 'Failed to check supplier' });
        }

        let supplierId;
        if (results.length > 0) {
            // Supplier exists
            supplierId = results[0].id;
        } else {
            // Insert new supplier
            const insertSupplierSql = 'INSERT INTO suppliers (name, email, phone, address) VALUES (?, ?, ?, ?)';
            db.query(insertSupplierSql, [name, email, phone, address], (err, result) => {
                if (err) {
                    console.error('Error inserting supplier:', err);
                    return res.status(500).json({ error: 'Failed to save supplier' });
                }
                supplierId = result.insertId;
            });
        }

        // Process products
        products.forEach(product => {
            const { productName, productCategory, productQuantity, productPrice, productTotalPrice } = product;

            // Check if product exists for this supplier
            const checkProductSql = 'SELECT id, product_quantity, product_total_price FROM supplier_products WHERE supplier_id = ? AND product_name = ? AND product_category = ? AND product_price = ?';
            db.query(checkProductSql, [supplierId, productName, productCategory, productPrice], (err, results) => {
                if (err) {
                    console.error('Error checking product:', err);
                    return res.status(500).json({ error: 'Failed to check product' });
                }

                if (results.length > 0) {
                    // Product exists, update quantity and total price
                    const existingProduct = results[0];
                    const newQuantity = existingProduct.product_quantity + productQuantity;
                    const newTotalPrice = existingProduct.product_total_price + productTotalPrice;
                    const updateProductSql = 'UPDATE supplier_products SET product_quantity = ?, product_total_price = ? WHERE id = ?';
                    db.query(updateProductSql, [newQuantity, newTotalPrice, existingProduct.id], (err, result) => {
                        if (err) {
                            console.error('Error updating product:', err);
                            return res.status(500).json({ error: 'Failed to update product' });
                        }
                    });
                } else {
                    // Insert new product
                    const insertProductSql = 'INSERT INTO supplier_products (supplier_id, product_name, product_category, product_quantity, product_price, product_total_price) VALUES (?, ?, ?, ?, ?, ?)';
                    db.query(insertProductSql, [supplierId, productName, productCategory, productQuantity, productPrice, productTotalPrice], (err, result) => {
                        if (err) {
                            console.error('Error inserting product:', err);
                            return res.status(500).json({ error: 'Failed to save product' });
                        }
                    });
                }
            });
        });

        res.json({ message: 'Supplier and products processed successfully' });
    });
});

// Fetch suppliers data
app.get('/suppliers', (req, res) => {
    const sql = `
        SELECT s.id, s.name, s.email, s.phone, s.address, 
               sp.product_name, sp.product_category, sp.product_quantity, sp.product_price, sp.product_total_price
        FROM suppliers s
        LEFT JOIN supplier_products sp ON s.id = sp.supplier_id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching suppliers data:', err);
            return res.status(500).json({ error: 'Failed to fetch suppliers data' });
        }
        const suppliers = results.reduce((acc, row) => {
            const { id, name, email, phone, address, product_name, product_category, product_quantity, product_price, product_total_price } = row;
            if (!acc[id]) {
                acc[id] = { id, name, email, phone, address, products: [] };
            }
            if (product_name) {
                acc[id].products.push({ product_name, product_category, product_quantity, product_price, product_total_price });
            }
            return acc;
        }, {});
        res.json(Object.values(suppliers));
    });
});

// Update a supplier
app.put('/suppliers/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const sql = 'UPDATE suppliers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?';
    db.query(sql, [name, email, phone, address, id], (err, result) => {
        if (err) {
            console.error('Error updating supplier:', err);
            return res.status(500).json({ error: 'Failed to update supplier' });
        }
        res.json({ message: 'Supplier updated' });
    });
});

// Delete a supplier
app.delete('/suppliers/:id', (req, res) => {
    const supplierId = req.params.id;
    console.log(`Received request to delete supplier with ID: ${supplierId}`);

    // Delete products associated with the supplier
    const deleteProductsSql = 'DELETE FROM supplier_products WHERE supplier_id = ?';
    db.query(deleteProductsSql, [supplierId], (err, result) => {
        if (err) {
            console.error('Error deleting products:', err);
            return res.status(500).json({ error: 'Failed to delete products' });
        }
        console.log(`Deleted products associated with supplier ID: ${supplierId}`);
        console.log(`Number of products deleted: ${result.affectedRows}`);

        // Delete the supplier
        const deleteSupplierSql = 'DELETE FROM suppliers WHERE id = ?';
        db.query(deleteSupplierSql, [supplierId], (err, result) => {
            if (err) {
                console.error('Error deleting supplier:', err);
                return res.status(500).json({ error: 'Failed to delete supplier' });
            }
            console.log(`Deleted supplier with ID: ${supplierId}`);
            console.log(`Number of suppliers deleted: ${result.affectedRows}`);
            res.json({ message: 'Supplier deleted successfully' });
        });
    });
});

app.get('/unpaid-orders', (req, res) => {
    const unpaidOrdersSql = 'SELECT product_name AS productName, category, price, quantity FROM orders WHERE paid = FALSE';

    db.query(unpaidOrdersSql, (err, results) => {
        if (err) {
            console.error('Error fetching unpaid orders data:', err);
            return res.status(500).json({ error: 'Failed to fetch unpaid orders data' });
        }
        res.json(results);
    });
});

app.get('/paid-orders', (req, res) => {
    const paidOrdersSql = 'SELECT product_name AS productName, category, price, quantity, total_price AS totalPrice FROM orders WHERE paid = TRUE';

    db.query(paidOrdersSql, (err, results) => {
        if (err) {
            console.error('Error fetching paid orders data:', err);
            return res.status(500).json({ error: 'Failed to fetch paid orders data' });
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
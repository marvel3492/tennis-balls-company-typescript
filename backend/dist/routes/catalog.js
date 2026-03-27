import { Router } from 'express';
import { adminOrCustomer, renderAllRecords, renderError } from '../utils.js';
import db from '../db.js';
var router = Router();
// ==================================================
// Route to list all products on the catalog
// URL: http://localhost:3039/catalog
// ==================================================
router.get('/', function (_req, res, _next) {
    // Not all of the products will show, since some products are out of stock.
    let query = "SELECT p.product_id, p.productname, p.saleprice, p.stock, i.filename, i.description FROM product p LEFT OUTER JOIN image i ON p.image_id = i.image_id WHERE p.stock > 0";
    renderAllRecords(res, query);
});
// ==================================================
// Route to add an item to the cart
// URL: http://localhost:3039/catalog/add
// ==================================================
router.post('/add', function (req, res, _next) {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    req.session.cart[req.body.product_id] = req.session.cart[req.body.product_id] ?? 0 + parseInt(req.body.qty);
    res.json({});
});
// ==================================================
// Route to show shopping cart
// URL: http://localhost:3039/catalog/cart
// ==================================================
router.get('/cart', function (req, res, _next) {
    if (!req.session.cart || !Object.keys(req.session.cart).length) {
        res.json({ cartitems: [], qtys: [], totprice: 0, totqty: 0, lineItemCosts: [] });
    }
    else {
        const placeholders = Object.entries(req.session.cart).map(([key]) => {
            return { key };
        }).join(',');
        let query = `SELECT product_id, productname, saleprice FROM product WHERE product_id IN (${placeholders})`;
        db.all(query, req.session.cart, (err, result) => {
            if (err) {
                renderError(res, err);
            }
            else {
                var totprice = 0;
                var totqty = 0;
                var lineItemCosts = [];
                result.forEach((item) => {
                    if (req.session.cart && typeof item === "object" && item !== null &&
                        "product_id" in item && typeof item.product_id === "number" &&
                        "saleprice" in item && typeof item.saleprice === "number") {
                        let quantity = req.session.cart[item.product_id];
                        if (quantity) {
                            let price = item.saleprice * quantity;
                            totprice += price;
                            totqty += quantity;
                            lineItemCosts.push(price);
                        }
                    }
                    else {
                        renderError(res, Error("Empty cart or unexpected data type"));
                    }
                });
                res.json({ cartitems: result, cart: req.session.cart, totprice: totprice, totqty: totqty, lineItemCosts: lineItemCosts });
            }
        });
    }
});
// ==================================================
// Route to remove an item from the cart
// URL: http://localhost:3039/catalog/remove
// ==================================================
router.delete('/remove', function (req, res, _next) {
    if (req.session.cart) {
        // Remove element from cart
        delete req.session.cart[req.body.product_id];
        res.json({});
    }
});
// ==================================================
// Route save cart items to SALEORDER and ORDERDETAILS tables
// URL: http://localhost:3039/catalog/checkout
// ==================================================
router.post('/checkout', adminOrCustomer, function (req, res, _next) {
    if (!req.session.cart || !Object.keys(req.session.cart).length) {
        res.json({ ordernum: -1 });
    }
    else {
        db.serialize(() => {
            var hasError = false;
            var error = null;
            function setError(err) {
                hasError = true;
                if (error == null) {
                    error = err;
                }
            }
            db.exec("BEGIN TRANSACTION", (err) => {
                if (err) {
                    setError(err);
                }
            });
            // Save SALEORDER Record:
            let insertquery = "INSERT INTO saleorder (customer_id, paymentstatus) VALUES (?, 1)";
            db.run(insertquery, [req.session.customer_id], function (err) {
                if (err) {
                    setError(err);
                }
                else {
                    // Obtain the order_id value of the newly created SALEORDER Record
                    var order_id = this.lastID;
                    let insertStmt = db.prepare("INSERT INTO orderdetail(order_id, product_id, saleprice, qty) VALUES (?, ?, (SELECT saleprice FROM product WHERE product_id = ?), ?)");
                    let updateStmt = db.prepare("UPDATE product SET stock = stock - ? WHERE product_id = ?");
                    // Save ORDERDETAIL Records
                    // There could be one or more items in the shopping cart
                    if (req.session.cart) {
                        for (const [key, value] of Object.entries(req.session.cart)) {
                            let query = `SELECT saleprice FROM product WHERE product_id = ?`;
                            db.all(query, key, (err, result) => {
                                if (err) {
                                    renderError(res, err);
                                }
                                else {
                                    if (Array.isArray(result) && result[0] !== null && typeof result[0] === "object" && "saleprice" in result[0]) {
                                        // Perform ORDERDETAIL table insert
                                        insertStmt.run(order_id, key, result[0].saleprice, value, (err) => {
                                            if (err) {
                                                setError(err);
                                            }
                                        });
                                        updateStmt.run(value, key, (err) => {
                                            if (err) {
                                                setError(err);
                                            }
                                        });
                                    }
                                    else {
                                        setError(Error("Unexpected data type"));
                                    }
                                }
                            });
                        }
                    }
                    else {
                        setError(Error("Empty cart"));
                    }
                    insertStmt.finalize((err) => {
                        if (err) {
                            setError(err);
                        }
                    });
                    updateStmt.finalize((err) => {
                        if (err) {
                            setError(err);
                        }
                        else {
                            if (hasError) {
                                db.run("ROLLBACK");
                                renderError(res, err);
                            }
                            else {
                                db.run("COMMIT", (err) => {
                                    if (err) {
                                        db.run("ROLLBACK");
                                        renderError(res, err);
                                    }
                                });
                                // Empty out the items from the cart
                                req.session.cart = [];
                                // Display confirmation page
                                res.json({ ordernum: order_id });
                            }
                        }
                    });
                }
            });
        });
    }
});
export default router;
//# sourceMappingURL=catalog.js.map
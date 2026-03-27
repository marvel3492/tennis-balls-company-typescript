import { Router } from 'express';
import { genSalt, hash as _hash, compare } from 'bcryptjs';
import { adminOnly, renderError, renderAllRecords, renderOneRecord, deleteRecord, guestOnly, guestOrAdmin, adminOrCustomer } from '../utils.js';
import db from '../db.js';
import { isCustomer, isCustomerArray } from '../../../shared/data/CustomerData.js';
var router = Router();
// ==================================================
// Route Provide Credentials
// URL: http://localhost:5000/customer/credentials
// ==================================================
router.get('/credentials', function (req, res, _next) {
    let userData = { customer_id: req.session.customer_id ?? 0, custname: req.session.custname ?? "", isadmin: req.session.isadmin ?? 0 };
    res.json(userData);
});
// ==================================================
// Route Check Login Credentials
// URL: http://localhost:5000/customer/login
// ==================================================
router.post('/login', guestOnly, function (req, res, _next) {
    let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username, isadmin FROM customer WHERE username = ?";
    db.all(query, [req.body.username], (err, result) => {
        if (err) {
            renderError(res, err);
        }
        else {
            if (!result[0]) {
                let loginData = { success: false, message: "Wrong Username" };
                res.status(401).json(loginData);
            } else if (!isCustomer(result[0]) || !("password" in result[0] && typeof result[0].password === "string")) {
                renderError(res, Error("Unexpected data type"));
            }
            else {
                // Username was correct. Check if password is correct
                compare(req.body.password, result[0].password, function (err, result2) {
                    if (err) {
                        renderError(res, err);
                    }
                    else if (!result2) {
                        // password do not match
                        let loginData = { success: false, message: "Wrong Password" };
                        res.status(401).json(loginData);
                    }
                    else if (!isCustomer(result[0])) {
                        renderError(res, Error("Unexpected data type"));
                    }
                    else {
                        // Password is correct. Set session variables for user.
                        var custid = result[0].customer_id;
                        req.session.customer_id = custid;
                        var custname = result[0].firstname + " " + result[0].lastname;
                        req.session.custname = custname;
                        var isadmin = result[0].isadmin;
                        req.session.isadmin = isadmin;
                        let loginData = { success: true, message: "Logging in" };
                        res.json(loginData);
                    }
                });
            }
        }
    });
});
// ==================================================
// Route Check Login Credentials
// URL: http://localhost:5000/customer/logout
// ==================================================
router.post('/logout', adminOrCustomer, function (req, res, _next) {
    req.session.customer_id = 0;
    req.session.custname = "";
    req.session.cart = [];
    req.session.isadmin = 0;
    res.json({});
});
// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:5000/customer/
// ==================================================
router.get('/', adminOnly, function (_req, res, _next) {
    let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username, isadmin FROM customer";
    renderAllRecords(res, query, isCustomerArray);
});
// ==================================================
// Route to view one specific record.
// URL: http://localhost:5000/customer/1/show
// ==================================================
router.get('/:recordid/show', adminOnly, function (req, res, _next) {
    let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username, isadmin FROM customer WHERE customer_id = ?";
    renderOneRecord(req, res, query, isCustomer);
});
function generatePassword(req, res, callback) {
    genSalt(10, (err, salt) => {
        if (err) {
            renderError(res, err);
        }
        else if (salt === undefined) {
            renderError(res, Error("Salt is undefined"));
        }
        else {
            _hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    renderError(res, err);
                }
                else if (hash === undefined) {
                    renderError(res, Error("Hash is undefined"));
                }
                else {
                    callback(hash);
                }
            });
        }
    });
}
// ==================================================
// Route to obtain user input and save in database.
// URL: http://localhost:5000/customer
// ==================================================
router.post('/', guestOrAdmin, function (req, res, _next) {
    generatePassword(req, res, (hash) => {
        let insertquery = "INSERT INTO customer (firstname, lastname, email, phone, address, city, state, zip, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.run(insertquery, [req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.username, hash], (err) => {
            if (err) {
                renderError(res, err, 400);
            }
            else if (req.session.isadmin) {
                res.json({ redirect: false });
            }
            else {
                res.json({ redirect: true }); // Guest must login with created account.
            }
        });
    });
});
// ==================================================
// Route to edit one specific record.
// URL: http://localhost:5000/customer/1/edit
// ==================================================
router.get('/:recordid/edit', adminOnly, function (req, res, _next) {
    let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username FROM customer WHERE customer_id = ?";
    renderOneRecord(req, res, query, isCustomer);
});
// ==================================================
// Route to save edited data in database.
// URL: http://localhost:5000/customer/save
// ==================================================
router.post('/save', adminOnly, function (req, res, _next) {
    // If an admin changes a customer's first name and/or last name, the customer must logout and log back in for the change to take effect.
    if (req.body.password === "" || req.body.password === null) {
        let updatequery = "UPDATE customer SET firstname = ?, lastname = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, zip = ?, username = ? WHERE customer_id = ?";
        db.run(updatequery, [req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.username, req.body.id], (err) => {
            if (err) {
                renderError(res, err, 400);
            }
            else {
                res.json({});
            }
        });
    }
    else {
        generatePassword(req, res, (hash) => {
            let updatequery = "UPDATE customer SET firstname = ?, lastname = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, zip = ?, username = ?, password = ? WHERE customer_id = ?";
            db.run(updatequery, [req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.username, hash, req.body.id], (err) => {
                if (err) {
                    renderError(res, err, 400);
                }
                else {
                    res.json({});
                }
            });
        });
    }
});
// ==================================================
// Route to delete one specific record.
// URL: http://localhost:5000/customer/delete
// ==================================================
router.delete('/delete', adminOnly, function (req, res, _next) {
    let query = "DELETE FROM customer WHERE customer_id = ?";
    deleteRecord(req, res, query);
});
export default router;
//# sourceMappingURL=customer.js.map
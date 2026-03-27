import { Router } from 'express';
import { adminOnly, renderError, renderAllRecords, renderOneRecord, deleteRecord } from '../utils.js';
import db from '../db.js';
var router = Router();
// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/product/
// ==================================================
router.get('/', adminOnly, function (_req, res, _next) {
    let query = "SELECT * FROM product";
    renderAllRecords(res, query);
});
// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3039/product/1/show
// ==================================================
router.get('/:recordid/show', function (req, res, _next) {
    let query = "SELECT * FROM product WHERE product_id = ?";
    renderOneRecord(req, res, query);
});
// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminOnly, function (req, res, _next) {
    let homepage_value = 0;
    if (req.body.homepage) {
        homepage_value = 1;
    }
    let imageId = null;
    if (req.body.image_id) {
        imageId = req.body.image_id;
    }
    let insertquery = "INSERT INTO product(image_id, productname, description, saleprice, stock, homepage) VALUES(?, ?, ?, ?, ?, ?)";
    db.run(insertquery, [imageId, req.body.productname, req.body.description, req.body.saleprice, req.body.stock, homepage_value], (err) => {
        if (err) {
            renderError(res, err, 400);
        }
        else {
            res.json({});
        }
    });
});
// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3039/product/1/edit
// ==================================================
router.get('/:recordid/edit', adminOnly, function (req, res, _next) {
    let query = "SELECT * FROM product WHERE product_id = ?";
    renderOneRecord(req, res, query);
});
// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminOnly, function (req, res, _next) {
    let homepage_value = 0;
    if (req.body.homepage) {
        homepage_value = 1;
    }
    let imageId = null;
    if (req.body.image_id) {
        imageId = req.body.image_id;
    }
    let updatequery = "UPDATE product SET image_id = ?, productname = ?, description = ?, saleprice = ?, stock = ?, homepage = ? WHERE product_id = ?";
    db.run(updatequery, [imageId, req.body.productname, req.body.description, req.body.saleprice, req.body.stock, homepage_value, req.body.id], (err) => {
        if (err) {
            renderError(res, err, 400);
        }
        else {
            res.json({});
        }
    });
});
// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3039/product/delete
// ==================================================
router.delete('/delete', adminOnly, function (req, res, _next) {
    let query = "DELETE FROM product WHERE product_id = ?";
    deleteRecord(req, res, query);
});
export default router;
//# sourceMappingURL=product.js.map
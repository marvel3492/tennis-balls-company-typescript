import { Router } from 'express';
import { adminOnly, renderError, renderAllRecords, renderOneRecord, deleteRecord } from '../utils.js';
import db from '../db.js';
import { isOrderDetail, isOrderDetailArray } from '../../../shared/data/OrderDetailData.js';
var router = Router();
// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/orderdetail/
// ==================================================
router.get('/', adminOnly, function (_req, res, _next) {
    let query = "SELECT * FROM orderdetail";
    renderAllRecords(res, query, isOrderDetailArray);
});
// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3039/orderdetail/1/show
// ==================================================
router.get('/:recordid/show', adminOnly, function (req, res, _next) {
    let query = "SELECT * FROM orderdetail WHERE orderdetail_id = ?";
    renderOneRecord(req, res, query, isOrderDetail);
});
// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminOnly, function (req, res, _next) {
    let insertquery = "INSERT INTO orderdetail(order_id, product_id, saleprice, qty) VALUES(?, ?, ?, ?)";
    db.run(insertquery, [req.body.order_id, req.body.product_id, req.body.saleprice, req.body.qty], (err) => {
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
// URL: http://localhost:3039/orderdetail/1/edit
// ==================================================
router.get('/:recordid/edit', adminOnly, function (req, res, _next) {
    let query = "SELECT * FROM orderdetail WHERE orderdetail_id = ?";
    renderOneRecord(req, res, query, isOrderDetail);
});
// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminOnly, function (req, res, _next) {
    let updatequery = "UPDATE orderdetail SET order_id = ?, product_id = ?, saleprice = ?, qty = ? WHERE orderdetail_id = ?";
    db.run(updatequery, [req.body.order_id, req.body.product_id, req.body.saleprice, req.body.qty, req.body.id], (err) => {
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
// URL: http://localhost:3039/orderdetail/delete
// ==================================================
router.delete('/delete', adminOnly, function (req, res, _next) {
    let query = "DELETE FROM orderdetail WHERE orderdetail_id = ?";
    deleteRecord(req, res, query);
});
export default router;
//# sourceMappingURL=orderdetail.js.map
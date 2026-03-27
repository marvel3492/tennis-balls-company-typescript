import { Router } from 'express';
import { adminOnly, renderError, renderAllRecords, renderOneRecord, deleteRecord } from '../utils.js';
import db from '../db.js';
import { isSaleOrder, isSaleOrderArray } from '../../../shared/data/SaleOrderData.js';
var router = Router();
// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/saleorder/
// ==================================================
router.get('/', adminOnly, function (_req, res, _next) {
    let query = "SELECT * FROM saleorder";
    renderAllRecords(res, query, isSaleOrderArray);
});
// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3039/saleorder/1/show
// ==================================================
router.get('/:recordid/show', adminOnly, function (req, res, _next) {
    let query = "SELECT * FROM saleorder WHERE order_id = ?";
    renderOneRecord(req, res, query, isSaleOrder);
});
// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminOnly, function (req, res, _next) {
    let insertquery = "INSERT INTO saleorder(customer_id, saledate, customernotes, paymentstatus) VALUES(?, ?, ?, ?)";
    db.run(insertquery, [req.body.customer_id, req.body.saledate, req.body.customernotes, req.body.paymentstatus], (err) => {
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
// URL: http://localhost:3039/saleorder/1/edit
// ==================================================
router.get('/:recordid/edit', adminOnly, function (req, res, _next) {
    let query = "SELECT * FROM saleorder WHERE order_id = ?";
    renderOneRecord(req, res, query, isSaleOrder);
});
// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminOnly, function (req, res, _next) {
    let updatequery = "UPDATE saleorder SET customer_id = ?, saledate = ?, customernotes = ?, paymentstatus = ? WHERE order_id = ?";
    db.run(updatequery, [req.body.customer_id, req.body.saledate, req.body.customernotes, req.body.paymentstatus, req.body.id], (err) => {
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
// URL: http://localhost:3039/saleorder/delete
// ==================================================
router.delete('/delete', adminOnly, function (req, res, _next) {
    let query = "DELETE FROM saleorder WHERE order_id = ?";
    deleteRecord(req, res, query);
});
export default router;
//# sourceMappingURL=saleorder.js.map
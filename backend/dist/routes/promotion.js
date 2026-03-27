import { Router } from 'express';
import { adminOnly, renderError, renderAllRecords, renderOneRecord, deleteRecord } from '../utils.js';
import db from '../db.js';
var router = Router();
// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/promotion/
// ==================================================
router.get('/', adminOnly, function (_req, res, _next) {
    let query = "SELECT * FROM promotion";
    renderAllRecords(res, query);
});
// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3039/promotion/1/show
// ==================================================
router.get('/:recordid/show', function (req, res, _next) {
    let query = "SELECT * FROM promotion WHERE promotion_id = ?";
    renderOneRecord(req, res, query);
});
// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminOnly, function (req, res, _next) {
    let imageId = null;
    if (req.body.image_id) {
        imageId = req.body.image_id;
    }
    let insertquery = "INSERT INTO promotion(image_id, promotitle, description, startdate, enddate, discountrate) VALUES(?, ?, ?, ?, ?, ?)";
    db.run(insertquery, [imageId, req.body.promotitle, req.body.description, req.body.startdate, req.body.enddate, req.body.discountrate], (err) => {
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
// URL: http://localhost:3039/promotion/1/edit
// ==================================================
router.get('/:recordid/edit', adminOnly, function (req, res, _next) {
    let query = "SELECT * FROM promotion WHERE promotion_id = ?";
    renderOneRecord(req, res, query);
});
// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminOnly, function (req, res, _next) {
    let imageId = null;
    if (req.body.image_id) {
        imageId = req.body.image_id;
    }
    let updatequery = "UPDATE promotion SET image_id = ?, promotitle = ?, description = ?, startdate = ?, enddate = ?, discountrate = ? WHERE promotion_id = ?";
    db.run(updatequery, [imageId, req.body.promotitle, req.body.description, req.body.startdate, req.body.enddate, req.body.discountrate, req.body.id], (err) => {
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
// URL: http://localhost:3039/promotion/delete
// ==================================================
router.delete('/delete', adminOnly, function (req, res, _next) {
    let query = "DELETE FROM promotion WHERE promotion_id = ?";
    deleteRecord(req, res, query);
});
export default router;
//# sourceMappingURL=promotion.js.map
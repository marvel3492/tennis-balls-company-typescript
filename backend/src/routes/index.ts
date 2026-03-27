import { Router } from 'express';
import { renderError } from '../utils.js';
import db from '../db.js';
var router = Router();

router.get('/', function(_req, res, _next) {
    // Not all of the products will show, since some products are out of stock.
    let query = "SELECT p.product_id, p.productname, p.saleprice, p.stock, i.filename, i.description FROM product p LEFT OUTER JOIN image i ON p.image_id = i.image_id WHERE p.homepage = 1 AND p.stock > 0";
    db.all(query, (err, result) => {
        if (err) {
            renderError(res, err);
        } else {
            let query2 = "SELECT p.promotion_id, i.filename, i.description FROM promotion p LEFT OUTER JOIN image i ON p.image_id = i.image_id WHERE p.startdate <= date('now') AND p.enddate >= date('now')";
            db.all(query2, (err2, result2) => {
                if (err2) {
                    renderError(res, err2);
                } else {
                    res.json({catalog: result, promotions: result2});
                }
            });
        }
    });
});

export default router;
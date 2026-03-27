import { Router } from 'express';
import { renderError } from '../utils.js';
import db from '../db.js';
var router = Router();
router.get('/', function (req, res, _next) {
    let query = "SELECT p.product_id, p.productname, p.saleprice, p.stock, i.filename, i.description FROM product p LEFT OUTER JOIN image i ON p.image_id = i.image_id WHERE p.description LIKE ? OR p.productname LIKE ?";
    db.all(query, [`%${req.query.searchcriteria}%`, `%${req.query.searchcriteria}%`], (err, result) => {
        if (err) {
            renderError(res, err);
        }
        else {
            let query2 = "SELECT COUNT(*) AS products FROM product WHERE description LIKE ? OR productname LIKE ?";
            db.all(query2, [`%${req.query.searchcriteria}%`, `%${req.query.searchcriteria}%`], (err2, result2) => {
                if (err) {
                    renderError(res, err2);
                }
                else {
                    if (result2[0] && typeof result2[0] === 'object' && "products" in result2[0]) {
                        res.json({ allrecs: result, products: result2[0].products });
                    }
                    else {
                        renderError(res, Error("Unexpected data type"));
                    }
                }
            });
        }
    });
});
export default router;
//# sourceMappingURL=search.js.map
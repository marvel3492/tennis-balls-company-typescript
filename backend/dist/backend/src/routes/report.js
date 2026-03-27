import { Router } from 'express';
import { adminOnly, renderAllRecords } from '../utils.js';
import { isCustomerArray } from '../../../shared/data/CustomerData.js';
import { isProductArray } from '../../../shared/data/ProductData.js';
import { isSaleArray } from '../../../shared/data/SaleData.js';
var router = Router();
// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/report/customer
// ==================================================
router.get('/customer', adminOnly, function (_req, res, _next) {
    let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username, isadmin FROM customer";
    renderAllRecords(res, query, isCustomerArray);
});
// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/report/product/
// ==================================================
router.get('/product', adminOnly, function (_req, res, _next) {
    let query = "SELECT * FROM product";
    renderAllRecords(res, query, isProductArray);
});
// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/report/sale/
// ==================================================
router.get('/sale', adminOnly, function (_req, res, _next) {
    let query = "SELECT s.order_id order_id, c.firstname firstname, c.lastname lastname, s.saledate saledate, p.productname productname, o.saleprice saleprice, o.qty qty FROM saleorder s, orderdetail o, product p, customer c WHERE s.order_id = o.order_id AND o.product_id = p.product_id AND s.customer_id = c.customer_id";
    renderAllRecords(res, query, isSaleArray);
});
export default router;
//# sourceMappingURL=report.js.map
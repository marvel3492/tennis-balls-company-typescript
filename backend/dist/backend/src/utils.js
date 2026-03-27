import {} from 'express';
import db from './db.js';
export function adminOnly(req, res, next) {
    if (!req.session.isadmin) {
        renderError(res, new Error("Unauthorized"), 401);
    }
    else {
        next();
    }
}
export function adminOrCustomer(req, res, next) {
    if (!req.session.isadmin && !req.session.customer_id) {
        renderError(res, new Error("Unauthorized"), 401);
    }
    else {
        next();
    }
}
export function guestOnly(req, res, next) {
    if (req.session.isadmin || req.session.customer_id) {
        renderError(res, new Error("Unauthorized"), 401);
    }
    else {
        next();
    }
}
export function guestOrAdmin(req, res, next) {
    if (!req.session.isadmin && req.session.customer_id) {
        renderError(res, new Error("Unauthorized"), 401);
    }
    else {
        next();
    }
}
export function renderError(res, err, code = 500) {
    console.log(err);
    res.status(code).json({
        message: err.message,
        name: err.name,
        stack: err.stack
    });
}
export function renderAllRecords(res, query, isTypeArray) {
    db.all(query, (err, result) => {
        if (err) {
            renderError(res, err);
        }
        else if (isTypeArray(result)) {
            res.json(result);
        }
        else {
            renderError(res, new Error("Unexpected data type"));
        }
    });
}
export function renderOneRecord(req, res, query, isType) {
    db.all(query, [req.params.recordid], (err, result) => {
        if (err) {
            renderError(res, err);
        }
        else if (!result || result.length === 0) {
            renderError(res, new Error("Not found"));
        }
        else if (!isType(result[0])) {
            renderError(res, new Error("Unexpected data type"));
        }
        else {
            res.json(result[0]);
        }
    });
}
export function deleteRecord(req, res, query) {
    db.run(query, [req.body.recordid], (err) => {
        if (err) {
            renderError(res, err);
        }
        else {
            res.json({});
        }
    });
}
//# sourceMappingURL=utils.js.map
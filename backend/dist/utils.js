import {} from 'express';
import db from './db.js';
export function adminOnly(req, res, next) {
    if (!req.session.isadmin) {
        res.json({ redirect: true });
    }
    else {
        next();
    }
}
export function adminOrCustomer(req, res, next) {
    if (!req.session.isadmin && !req.session.customer_id) {
        res.json({ redirect: true });
    }
    else {
        next();
    }
}
export function guestOnly(req, res, next) {
    if (req.session.isadmin || req.session.customer_id) {
        res.json({ redirect: true });
    }
    else {
        next();
    }
}
export function guestOrAdmin(req, res, next) {
    if (!req.session.isadmin && req.session.customer_id) {
        res.json({ redirect: true });
    }
    else {
        next();
    }
}
export function renderError(res, err, code = 500) {
    console.log(err);
    res.status(code).json({ error: err });
}
export function renderAllRecords(res, query) {
    db.all(query, (err, result) => {
        if (err) {
            renderError(res, err);
        }
        else {
            res.json({ allrecs: result });
        }
    });
}
export function renderOneRecord(req, res, query) {
    db.all(query, [req.params.recordid], (err, result) => {
        if (err) {
            renderError(res, err);
        }
        else if (!result || result.length === 0) {
            res.status(404).json({ error: { code: "Not Found" } });
        }
        else {
            res.json({ onerec: result[0] });
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
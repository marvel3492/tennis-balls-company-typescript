import { type Request, type Response, type NextFunction } from 'express';
import db from './db.js';

export function adminOnly(req: Request, res: Response, next: NextFunction) {
    if (!req.session.isadmin) {
        renderError(res, Error("Unauthorized"), 401);
    } else {
        next();
    }
}

export function adminOrCustomer(req: Request, res: Response, next: NextFunction) {
    if (!req.session.isadmin && !req.session.customer_id) {
        renderError(res, Error("Unauthorized"), 401);
    } else {
        next();
    }
}

export function guestOnly(req: Request, res: Response, next: NextFunction) {
    if (req.session.isadmin || req.session.customer_id) {
        renderError(res, Error("Unauthorized"), 401);
    } else {
        next();
    }
}

export function guestOrAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.session.isadmin && req.session.customer_id) {
        renderError(res, Error("Unauthorized"), 401);
    } else {
        next();
    }
}

export function renderError(res: Response, err: Error, code = 500) {
    console.log(err);
    res.status(code).json({
        message: err.message,
        name: err.name,
        stack: err.stack
    });
}

export function renderAllRecords(res: Response, query: string, isTypeArray: (result: unknown) => boolean) {
    db.all(query, (err, result) => {
        if (err) {
            renderError(res, err);
        } else if (isTypeArray(result)) {
            res.json(result);
        } else {
            renderError(res, Error("Unexpected data type"));
        }
    });
}

export function renderOneRecord(req: Request, res: Response, query: string, isType: (result: unknown) => boolean) {
    db.all(query, [req.params.recordid], (err, result) => {
        if (err) {
            renderError(res, err);
        } else if (!result || result.length === 0) {
            renderError(res, Error("Not found"));
        } else if (!isType(result[0])) {
            renderError(res, Error("Unexpected data type"));
        } else {
            res.json(result[0]);
        }
    });
}

export function deleteRecord(req: Request, res: Response, query: string) {
    db.run(query, [req.body.recordid], (err) => {
        if (err) {
            renderError(res, err);
        } else {
            res.json({});
        }
    });
}
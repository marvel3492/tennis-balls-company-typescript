import { type Request, type Response, type NextFunction } from 'express';
export declare function adminOnly(req: Request, res: Response, next: NextFunction): void;
export declare function adminOrCustomer(req: Request, res: Response, next: NextFunction): void;
export declare function guestOnly(req: Request, res: Response, next: NextFunction): void;
export declare function guestOrAdmin(req: Request, res: Response, next: NextFunction): void;
export declare function renderError(res: Response, err: Error, code?: number): void;
export declare function renderAllRecords(res: Response, query: string, isTypeArray: (result: unknown) => boolean): void;
export declare function renderOneRecord(req: Request, res: Response, query: string, isType: (result: unknown) => boolean): void;
export declare function deleteRecord(req: Request, res: Response, query: string): void;
//# sourceMappingURL=utils.d.ts.map
import createError from 'http-errors';
import express, { json, urlencoded, static as _static } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import session from 'express-session';
// Routes
import catalogRouter from "./routes/catalog.js";
import customerRouter from "./routes/customer.js";
import imageRouter from "./routes/image.js";
import indexRouter from "./routes/index.js";
import orderDetailRouter from "./routes/orderdetail.js";
import productRouter from './routes/product.js';
import promotionRouter from './routes/promotion.js';
import reportRouter from './routes/report.js';
import saleOrderRouter from './routes/saleorder.js';
import searchRouter from './routes/search.js';
var app = express();
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(session({
    secret: 'TennisBallsCompanyAppSecret',
    resave: false,
    saveUninitialized: false
}));
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});
// Use routes
app.use("/catalog", catalogRouter);
app.use("/customer", customerRouter);
app.use("/image", imageRouter);
app.use("/", indexRouter);
app.use("/orderdetail", orderDetailRouter);
app.use("/product", productRouter);
app.use("/promotion", promotionRouter);
app.use("/report", reportRouter);
app.use("/saleorder", saleOrderRouter);
app.use("/search", searchRouter);
app.use("/images", _static("uploads"));
// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(500);
    res.json({ error: err });
});
export default app;
//# sourceMappingURL=app.js.map
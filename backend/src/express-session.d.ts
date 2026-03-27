import "express-session";
declare module "express-session" {
  interface SessionData {
    customer_id?: number;
    cart?: Cart;
    custname?: string
    isadmin?: number
  }
}
import { type CartType } from "../Cart.js";
import { type ProductData } from "./ProductData.js";
export type CartData = {
    cartitems: ProductData[];
    cart: CartType;
    totprice: number;
    totqty: number;
    lineItemCosts: number[];
};
export declare function isCart(item: unknown): item is CartData;

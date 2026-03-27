import { type CartType } from "../Cart.js";
import { isProductArray, type ProductData } from "./ProductData.js";

export type CartData = {
    cartitems: ProductData[],
    cart: CartType,
    totprice: number,
    totqty: number,
    lineItemCosts: number[]
};

function isCartType(value: unknown): value is CartType {
    return (
        typeof value === "object" && value !== null &&
            Object.entries(value).every(([k, v]) => !Number.isNaN(Number(k)) && typeof v === "number")
    );
}


export function isCart(item: unknown): item is CartData {
    return typeof item === "object" && item !== null &&
        "cartitems" in item && isProductArray(item.cartitems) &&
        "cart" in item && isCartType(item.cart) &&
        "totprice" in item && typeof item.totprice === "number" &&
        "totqty" in item && typeof item.totqty === "number" &&
        "lineItemCosts" in item && Array.isArray(item.lineItemCosts) && item.lineItemCosts.every(v => typeof v === "number")
}
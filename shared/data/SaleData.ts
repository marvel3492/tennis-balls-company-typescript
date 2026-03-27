export type SaleData = {
    order_id: number,
    firstname: string,
    lastname: string,
    saledate: string,
    productname: string,
    saleprice: number,
    qty: number
};

export function isSale(item: unknown): item is SaleData {
    return typeof item === "object" && item !== null &&
        "order_id" in item && typeof item.order_id === "number" &&
        "firstname" in item && typeof item.firstname === "string" &&
        "lastname" in item && typeof item.lastname === "string" &&
        "saledate" in item && typeof item.saledate === "string" &&
        "productname" in item && typeof item.productname === "string" &&
        "saleprice" in item && typeof item.saleprice === "number" &&
        "qty" in item && typeof item.qty === "number";
}

export function isSaleArray(value: unknown): value is SaleData[] {
    return Array.isArray(value) && value.every(v => isSale(v));
}
export type OrderDetailData = {
    orderdetail_id: number,
    order_id: number,
    product_id: number,
    saleprice: number,
    qty: number
};

export function isOrderDetail(item: unknown): item is OrderDetailData {
    return typeof item === "object" && item !== null &&
        "orderdetail_id" in item && typeof item.orderdetail_id === "number" &&
        "order_id" in item && typeof item.order_id === "number" &&
        "product_id" in item && typeof item.product_id === "number" &&
        "saleprice" in item && typeof item.saleprice === "number" &&
        "qty" in item && typeof item.qty === "number";
}

export function isOrderDetailArray(value: unknown): value is OrderDetailData[] {
    return Array.isArray(value) && value.every(v => isOrderDetail(v));
}
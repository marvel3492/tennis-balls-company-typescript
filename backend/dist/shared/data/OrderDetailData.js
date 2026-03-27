export function isOrderDetail(item) {
    return typeof item === "object" && item !== null &&
        "orderdetail_id" in item && typeof item.orderdetail_id === "number" &&
        "order_id" in item && typeof item.order_id === "number" &&
        "product_id" in item && typeof item.product_id === "number" &&
        "saleprice" in item && typeof item.saleprice === "number" &&
        "qty" in item && typeof item.qty === "number";
}
export function isOrderDetailArray(value) {
    return Array.isArray(value) && value.every(v => isOrderDetail(v));
}
//# sourceMappingURL=OrderDetailData.js.map
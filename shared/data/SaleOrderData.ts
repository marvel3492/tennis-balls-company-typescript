export type SaleOrderData = {
    order_id: number,
    customer_id: number,
    saledate: string,
    customernotes: string,
    paymentstatus: number
};

export function isSaleOrder(item: unknown): item is SaleOrderData {
    return typeof item === "object" && item !== null &&
        "order_id" in item && typeof item.order_id === "number" &&
        "customer_id" in item && typeof item.customer_id === "number" &&
        "saledate" in item && typeof item.saledate === "string" &&
        "customernotes" in item && typeof item.customernotes === "string" &&
        "paymentstatus" in item && typeof item.paymentstatus === "number";
}

export function isSaleOrderArray(value: unknown): value is SaleOrderData[] {
    return Array.isArray(value) && value.every(v => isSaleOrder(v));
}
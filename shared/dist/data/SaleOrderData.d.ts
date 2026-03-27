export type SaleOrderData = {
    order_id: number;
    customer_id: number;
    saledate: string;
    customernotes: string;
    paymentstatus: number;
};
export declare function isSaleOrder(item: unknown): item is SaleOrderData;
export declare function isSaleOrderArray(value: unknown): value is SaleOrderData[];

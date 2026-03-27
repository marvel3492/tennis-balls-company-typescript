export type OrderDetailData = {
    orderdetail_id: number;
    order_id: number;
    product_id: number;
    saleprice: number;
    qty: number;
};
export declare function isOrderDetail(item: unknown): item is OrderDetailData;
export declare function isOrderDetailArray(value: unknown): value is OrderDetailData[];

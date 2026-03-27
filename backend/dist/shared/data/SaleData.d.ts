export type SaleData = {
    order_id: number;
    firstname: string;
    lastname: string;
    saledate: string;
    productname: string;
    saleprice: number;
    qty: number;
};
export declare function isSale(item: unknown): item is SaleData;
export declare function isSaleArray(value: unknown): value is SaleData[];
//# sourceMappingURL=SaleData.d.ts.map
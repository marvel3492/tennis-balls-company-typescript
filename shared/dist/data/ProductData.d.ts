import type { OptionalType } from "../Optional.js";
export type ProductData = {
    product_id: number;
    image_id: OptionalType<number>;
    productname: string;
    description: string;
    saleprice: number;
    stock: number;
    homepage: number;
};
export declare function isProduct(item: unknown): item is ProductData;
export declare function isProductArray(value: unknown): value is ProductData[];

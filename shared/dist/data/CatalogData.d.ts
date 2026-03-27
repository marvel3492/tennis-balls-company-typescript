import type { OptionalType } from "../Optional.js";
export type CatalogData = {
    product_id: number;
    productname: string;
    saleprice: number;
    stock: number;
    filename: OptionalType<string>;
    description: OptionalType<string>;
};
export declare function isCatalog(item: unknown): item is CatalogData;
export declare function isCatalogArray(value: unknown): value is CatalogData[];

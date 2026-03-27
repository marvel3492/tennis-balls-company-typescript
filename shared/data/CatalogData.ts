import type { OptionalType } from "../Optional.js";

export type CatalogData = {
    product_id: number,
    productname: string,
    saleprice: number,
    stock: number,
    filename: OptionalType<string>,
    description: OptionalType<string>
};

export function isCatalog(item: unknown): item is CatalogData {
    return typeof item === "object" && item !== null &&
        "product_id" in item && typeof item.product_id === "number" &&
        "saleprice" in item && typeof item.saleprice === "number" &&
        "productname" in item && typeof item.productname === "string" &&
        "stock" in item && typeof item.stock === "number" &&
        "filename" in item && (typeof item.filename === "string" || item.filename === null) &&
        "description" in item && (typeof item.description === "string" || item.description === null);
}

export function isCatalogArray(value: unknown): value is CatalogData[] {
    return Array.isArray(value) && value.every(v => isCatalog(v));
}
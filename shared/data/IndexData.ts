import { type CatalogData, isCatalogArray } from "./CatalogData.js";

export type IndexData = {
    catalog: CatalogData[],
    promotions: {promotion_id: number, filename: string, description: string}[]
};

export function isIndex(item: unknown): item is IndexData {
    return typeof item === "object" && item !== null &&
        "catalog" in item && isCatalogArray(item.catalog) &&
        "promotions" in item && Array.isArray(item.promotions) && item.promotions.every(v => {
            return typeof v === "object" && v !== null &&
                "promotion_id" in v && typeof v.promotion_id === "number" &&
                "filename" in v && typeof v.filename === "string" &&
                "description" in v && typeof v.description === "string"
        });
}
import { isCatalogArray } from "./CatalogData.js";
export function isIndex(item) {
    return typeof item === "object" && item !== null &&
        "catalog" in item && isCatalogArray(item.catalog) &&
        "promotions" in item && Array.isArray(item.promotions) && item.promotions.every(v => {
        return typeof v === "object" && v !== null &&
            "promotion_id" in v && typeof v.promotion_id === "number" &&
            "filename" in v && typeof v.filename === "string" &&
            "description" in v && typeof v.description === "string";
    });
}

export function isCatalog(item) {
    return typeof item === "object" && item !== null &&
        "product_id" in item && typeof item.product_id === "number" &&
        "saleprice" in item && typeof item.saleprice === "number" &&
        "productname" in item && typeof item.productname === "string" &&
        "stock" in item && typeof item.stock === "number" &&
        "filename" in item && (typeof item.filename === "string" || item.filename === null) &&
        "description" in item && (typeof item.description === "string" || item.description === null);
}
export function isCatalogArray(value) {
    return Array.isArray(value) && value.every(v => isCatalog(v));
}
//# sourceMappingURL=CatalogData.js.map
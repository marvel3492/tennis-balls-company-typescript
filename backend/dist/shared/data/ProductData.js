export function isProduct(item) {
    return typeof item === "object" && item !== null &&
        "product_id" in item && typeof item.product_id === "number" &&
        "image_id" in item && (typeof item.image_id === "number" || item.image_id === null) &&
        "productname" in item && typeof item.productname === "string" &&
        "description" in item && typeof item.description === "string" &&
        "saleprice" in item && typeof item.saleprice === "number" &&
        "stock" in item && typeof item.stock === "number" &&
        "homepage" in item && typeof item.homepage === "number";
}
export function isProductArray(value) {
    return Array.isArray(value) && value.every(v => isProduct(v));
}
//# sourceMappingURL=ProductData.js.map
export function isPromotion(item) {
    return typeof item === "object" && item !== null &&
        "promotion_id" in item && typeof item.promotion_id === "number" &&
        "image_id" in item && (typeof item.image_id === "number" || item.image_id === null) &&
        "promotitle" in item && typeof item.promotitle === "string" &&
        "description" in item && typeof item.description === "string" &&
        "startdate" in item && typeof item.startdate === "string" &&
        "enddate" in item && typeof item.enddate === "string" &&
        "discountrate" in item && typeof item.discountrate === "number";
}
export function isPromotionArray(value) {
    return Array.isArray(value) && value.every(v => isPromotion(v));
}
//# sourceMappingURL=PromotionData.js.map
import type { OptionalType } from "../Optional.js";

export type PromotionData = {
    promotion_id: number,
    image_id: OptionalType<number>,
    promotitle: string,
    description: string,
    startdate: string,
    enddate: string,
    discountrate: number
};

export function isPromotion(item: unknown): item is PromotionData {
    return typeof item === "object" && item !== null &&
        "promotion_id" in item && typeof item.promotion_id === "number" &&
        "image_id" in item && (typeof item.image_id === "number" || item.image_id === null) &&
        "promotitle" in item && typeof item.promotitle === "string" &&
        "description" in item && typeof item.description === "string" &&
        "startdate" in item && typeof item.startdate === "string" &&
        "enddate" in item && typeof item.enddate === "string" &&
        "discountrate" in item && typeof item.discountrate === "number";
}

export function isPromotionArray(value: unknown): value is PromotionData[] {
    return Array.isArray(value) && value.every(v => isPromotion(v));
}
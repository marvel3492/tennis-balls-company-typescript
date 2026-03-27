import type { OptionalType } from "../Optional.js";
export type PromotionData = {
    promotion_id: number;
    image_id: OptionalType<number>;
    promotitle: string;
    description: string;
    startdate: string;
    enddate: string;
    discountrate: number;
};
export declare function isPromotion(item: unknown): item is PromotionData;
export declare function isPromotionArray(value: unknown): value is PromotionData[];
//# sourceMappingURL=PromotionData.d.ts.map
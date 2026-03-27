import { type CatalogData } from "./CatalogData.js";
export type IndexData = {
    catalog: CatalogData[];
    promotions: {
        promotion_id: number;
        filename: string;
        description: string;
    }[];
};
export declare function isIndex(item: unknown): item is IndexData;

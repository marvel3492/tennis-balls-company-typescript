import { type CatalogData } from "./CatalogData.js";
export type SearchData = CatalogData[];
export declare function isSearch(item: unknown): item is SearchData;

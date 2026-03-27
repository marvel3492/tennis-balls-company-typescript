import { type CatalogData, isCatalogArray } from "./CatalogData.js";

export type SearchData = CatalogData[];

export function isSearch(item: unknown): item is SearchData {
    return typeof item === "object" && item !== null && isCatalogArray(item);
}
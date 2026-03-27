import { isCatalogArray } from "./CatalogData.js";
export function isSearch(item) {
    return typeof item === "object" && item !== null && isCatalogArray(item);
}
//# sourceMappingURL=SearchData.js.map
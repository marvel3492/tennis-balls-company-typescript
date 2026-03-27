export function isImage(item) {
    return typeof item === "object" && item !== null &&
        "image_id" in item && typeof item.image_id === "number" &&
        "filename" in item && typeof item.filename === "string" &&
        "description" in item && typeof item.description === "string";
}
export function isImageArray(value) {
    return Array.isArray(value) && value.every(v => isImage(v));
}

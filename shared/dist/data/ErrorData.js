export function isError(item) {
    return typeof item === "object" && item !== null &&
        "message" in item && typeof item.message === "string" &&
        "name" in item && typeof item.name === "string" &&
        ("stack" in item == false || typeof item.stack === "string");
}

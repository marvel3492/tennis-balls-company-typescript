export function isLogin(item) {
    return typeof item === "object" && item !== null &&
        "success" in item && typeof item.success === "boolean" &&
        "message" in item && typeof item.message === "string";
}
//# sourceMappingURL=LoginData.js.map
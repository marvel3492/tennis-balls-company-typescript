export type LoginData = {
    success: boolean,
    message: string,
};

export function isLogin(item: unknown): item is LoginData {
    return typeof item === "object" && item !== null &&
        "success" in item && typeof item.success === "boolean" &&
        "message" in item && typeof item.message === "string";
}
export type ErrorData = {
    message: string,
    name: string,
    stack?: string
};

export function isError(item: unknown): item is ErrorData {
    return typeof item === "object" && item !== null &&
        "message" in item && typeof item.message === "string" &&
        "name" in item && typeof item.name === "string" &&
        ("stack" in item == false || typeof item.stack === "string"); 
}
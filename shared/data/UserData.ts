export type UserData = {
    customer_id: number,
    custname: string,
    isadmin: number
}

export function isUser(item: unknown): item is UserData {
    return typeof item === "object" && item !== null &&
        "customer_id" in item && typeof item.customer_id === "number" &&
        "custname" in item && typeof item.custname === "string" &&
        "isadmin" in item && typeof item.isadmin === "number";
}

export function isUserArray(value: unknown): value is UserData[] {
    return Array.isArray(value) && value.every(v => isUser(v));
}
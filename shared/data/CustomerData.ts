export type CustomerData = {
    customer_id: number,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    username: string,
    isadmin: number
};

export function isCustomer(item: unknown): item is CustomerData {
    return typeof item === "object" && item !== null &&
        "customer_id" in item && typeof item.customer_id === "number" &&
        "firstname" in item && typeof item.firstname === "string" &&
        "lastname" in item && typeof item.lastname === "string" &&
        "email" in item && typeof item.email === "string" &&
        "phone" in item && typeof item.phone === "string" &&
        "address" in item && typeof item.address === "string" &&
        "city" in item && typeof item.city === "string" &&
        "state" in item && typeof item.state === "string" &&
        "zip" in item && typeof item.zip === "string" &&
        "username" in item && typeof item.username === "string" &&
        "isadmin" in item && typeof item.isadmin === "number"; 
}

export function isCustomerArray(value: unknown): value is CustomerData[] {
    return Array.isArray(value) && value.every(v => isCustomer(v));
}
export type CustomerData = {
    customer_id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    username: string;
    isadmin: number;
};
export declare function isCustomer(item: unknown): item is CustomerData;
export declare function isCustomerArray(value: unknown): value is CustomerData[];
//# sourceMappingURL=CustomerData.d.ts.map
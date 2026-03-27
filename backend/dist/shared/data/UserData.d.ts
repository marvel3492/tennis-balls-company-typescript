export type UserData = {
    customer_id: number;
    custname: string;
    isadmin: number;
};
export declare function isUser(item: unknown): item is UserData;
export declare function isUserArray(value: unknown): value is UserData[];
//# sourceMappingURL=UserData.d.ts.map
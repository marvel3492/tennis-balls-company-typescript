export type LoginData = {
    success: boolean;
    message: string;
};
export declare function isLogin(item: unknown): item is LoginData;

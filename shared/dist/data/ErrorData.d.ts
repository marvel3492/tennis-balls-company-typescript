export type ErrorData = {
    message: string;
    name: string;
    stack?: string;
};
export declare function isError(item: unknown): item is ErrorData;

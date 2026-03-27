export type ImageData = {
    image_id: number;
    filename: string;
    description: string;
};
export declare function isImage(item: unknown): item is ImageData;
export declare function isImageArray(value: unknown): value is ImageData[];
//# sourceMappingURL=ImageData.d.ts.map
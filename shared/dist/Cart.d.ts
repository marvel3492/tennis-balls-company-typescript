export type CartType = Record<number, number>;
export declare function getCartQuantity(cart: CartType, productId: number): number;
export declare function getCartLength(cart: CartType): number;

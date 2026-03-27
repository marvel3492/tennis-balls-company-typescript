export type CartType = Record<number, number>;

export function getCartQuantity(cart: CartType, productId: number) {
    return cart[productId] ?? 0;
}

export function getCartLength(cart: CartType) {
    return Object.keys(cart).length;
}
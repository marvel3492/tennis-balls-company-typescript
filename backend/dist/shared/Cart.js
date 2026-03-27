export function getCartQuantity(cart, productId) {
    return cart[productId] ?? 0;
}
export function getCartLength(cart) {
    return Object.keys(cart).length;
}
//# sourceMappingURL=Cart.js.map
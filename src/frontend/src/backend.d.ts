import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ProductId = bigint;
export interface CartItem {
    productId: ProductId;
    quantity: bigint;
}
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    isFeatured: boolean;
    category: Category;
    isNew: boolean;
    priceCents: bigint;
}
export enum Category {
    tee = "tee",
    accessory = "accessory",
    jogger = "jogger",
    hoodie = "hoodie"
}
export interface backendInterface {
    addItemToCart(productId: ProductId, quantity: bigint): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(): Promise<Array<CartItem>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getNewArrivals(): Promise<Array<Product>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    removeItemFromCart(productId: ProductId): Promise<void>;
}

import { Category } from "../backend.d";

export function getProductImage(category: Category): string {
  switch (category) {
    case Category.hoodie:
      return "/assets/generated/product-hoodie.dim_600x700.jpg";
    case Category.tee:
      return "/assets/generated/product-tee.dim_600x700.jpg";
    case Category.jogger:
      return "/assets/generated/product-jogger.dim_600x700.jpg";
    default:
      return "/assets/generated/product-hoodie.dim_600x700.jpg";
  }
}

export function formatPrice(priceCents: bigint): string {
  const dollars = Number(priceCents) / 100;
  return `$${dollars.toFixed(2)}`;
}

export function getCategoryLabel(category: Category): string {
  switch (category) {
    case Category.hoodie:
      return "Hoodie";
    case Category.tee:
      return "Tee";
    case Category.jogger:
      return "Jogger";
    case Category.accessory:
      return "Accessory";
    default:
      return category;
  }
}

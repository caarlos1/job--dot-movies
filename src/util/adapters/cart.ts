import type { CartItem } from "@/components/shop/cart-list/CartList.vue";
import type { ProductCardProps } from "@/components/shop/product-card/ProductCard.vue";

export const cartItemAdapter = (product: ProductCardProps): CartItem => {
  return {
    id: product.id,
    title: product.title,
    cover: product.cover || "",
    num: 1,
    price: product.price || 0,
  };
};

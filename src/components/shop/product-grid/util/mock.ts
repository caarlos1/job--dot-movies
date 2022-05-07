import type { ProductCardProps } from "../../product-card/ProductCard.vue";
import { product } from "../../product-card/util/mock";

export const productList = (num = 12) => {
  const products: ProductCardProps[] = [];

  for (let i = 1; i <= num; i++) {
    products.push({
      ...product,
      title: `${product.title} ${i}`,
    });
  }

  return products;
};

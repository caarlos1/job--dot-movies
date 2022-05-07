<script setup lang="ts">
import ProductCard, {
  type ProductCardProps,
} from "../product-card/ProductCard.vue";
import ButtonUI from "../../ui/button/ButtonUI.vue";

export interface ProductGridProps {
  products: ProductCardProps[];
}

defineEmits(["grid:load-more"]);
withDefaults(defineProps<ProductGridProps>(), {
  products: () => [],
});
</script>

<template>
  <div class="product-grid__container">
    <div class="product__box" v-for="product in products" :key="product.id">
      <ProductCard v-bind="product" />
    </div>
    <div class="grid__loading">
      <ButtonUI
        label="Carregar mais Filmes"
        size="lg"
        radius
        @click="() => $emit('grid:load-more')"
      />
    </div>
  </div>
</template>

<style scoped>
.product-grid__container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 30px;
  padding-bottom: 30px;
}
.product__box {
  flex: 1;
  min-width: 350px;
  max-width: 400px;
  padding-bottom: 30px;
}

.grid__loading {
  z-index: 20;
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  background: transparent;
}

@media (max-width: 600px) {
  .product__box {
    min-width: 300px;
    max-width: 100%;
  }
} ;
</style>

<script setup lang="ts">
import ProductCard, {
  type ProductCardProps,
} from "../product-card/ProductCard.vue";
import ButtonUI from "../../ui/button/ButtonUI.vue";

export interface ProductGridProps {
  products: ProductCardProps[];
  requestButton: string;
  emptyText: string;
}

defineEmits(["grid:load-more"]);
withDefaults(defineProps<ProductGridProps>(), {
  products: () => [],
  requestButton: "Carregar mais...",
  emptyText: "Nenhum item encontrado.",
});
</script>

<template>
  <div class="product-grid__container">
    <template v-if="products.length">
      <div class="product__box" v-for="product in products" :key="product.id">
        <ProductCard v-bind="product" />
      </div>
    </template>

    <span v-else class="product__empty"> {{ emptyText }} </span>

    <div class="grid__loading">
      <ButtonUI
        :label="requestButton"
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

.product__empty {
  padding: 40px 0 20px 0;
  font-size: 2.2rem;
}

.grid__loading {
  z-index: 20;
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  background: transparent;
  max-height: 100px;
}

@media (max-width: 600px) {
  .product__box {
    min-width: 300px;
    max-width: 100%;
  }
} ;
</style>

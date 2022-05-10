<script setup lang="ts">
import ProductCard, {
  type ProductCardProps,
} from "../product-card/ProductCard.vue";
import ButtonUI from "../../ui/button/ButtonUI.vue";
import SpinnerUI from "../../ui/spinner/SpinnerUI.vue";

export interface ProductGridProps {
  page: number;
  title?: string;
  loading: boolean;
  products: ProductCardProps[];
  requestButton?: string;
  emptyText?: string;
  addAction: (product: ProductCardProps) => void;
}

defineEmits(["grid:load-more"]);
withDefaults(defineProps<ProductGridProps>(), {
  page: 1,
  title: "",
  products: () => [],
  requestButton: "Carregar mais...",
  emptyText: "Nenhum item encontrado.",
  loading: false,
});
</script>

<template>
  <h2 v-if="title" class="product-grid__title">{{ title }}</h2>

  <div class="product-grid__container">
    <template v-if="products.length">
      <div class="product__box" v-for="product in products" :key="product.id">
        <ProductCard v-bind="product" @card:add="addAction" />
      </div>
    </template>

    <span v-else class="product__empty"> {{ emptyText }} </span>

    <div class="grid__loading">
      <ButtonUI
        v-if="!loading"
        :label="loading ? 'Carregando...' : requestButton"
        size="lg"
        radius
        :disabled="loading"
        @click="() => $emit('grid:load-more')"
      />

      <SpinnerUI v-else :size="5" />
    </div>
  </div>
</template>

<style scoped>
.product-grid__title {
  font-weight: 800;
  font-size: 3rem;
  line-height: 3rem;
  padding-bottom: 3rem;
}
.product-grid__container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  width: 100%;
  text-align: center;
  padding: 40px 0 20px 0;
  font-size: 2.2rem;
}

.grid__loading {
  z-index: 20;
  width: 100%;
  display: flex;
  justify-content: center;
  background: transparent;
  max-height: 100px;
}

@media (max-width: 992px) {
  .product__box {
    min-width: 300px;
  }
}

@media (max-width: 992px) {
  .product__box {
    min-width: 250px;
  }
}

@media (max-width: 600px) {
  .product__box {
    min-width: 100%;
  }
}
</style>

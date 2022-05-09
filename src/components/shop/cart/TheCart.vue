<script setup lang="ts">
import { computed } from "vue";
import CartList, { type CartItem } from "../cart-list/CartList.vue";
import ButtonUI from "../../ui/button/ButtonUI.vue";

export interface TheCartProps {
  title?: string;
  total: number;
  header: boolean;
  big: boolean;
  addButton: boolean;
  items: CartItem[];
  confirmButton: string;
  addAction: (item: CartItem) => void;
  deleteAction: (item: CartItem) => void;
  scroll?: boolean;
}

const props = withDefaults(defineProps<TheCartProps>(), {
  header: false,
  total: 10,
  big: false,
  addButton: false,
  scroll: false,
  items: () => [],
  addAction: () => {
    return;
  },
  deleteAction: () => {
    return;
  },
});

defineEmits(["cart:submit", "cart:clear"]);

const formatedPrice = computed(() =>
  props.total ? `R$ ${props.total.toFixed(2).replace(".", ",")}` : ""
);
</script>

<template>
  <div class="cart__container">
    <div class="cart__header">
      <h3 v-if="title" class="cart__title">{{ title }}</h3>
      <span
        v-if="items.length"
        class="cart__clean"
        @click="() => $emit('cart:clear')"
        >Esvaziar</span
      >
    </div>
    <div class="cart__list" :class="{ 'cart__list--scroll ': scroll }">
      <CartList
        v-bind="props"
        @cart:add="addAction"
        @cart:delete="deleteAction"
      />
    </div>

    <div v-if="formatedPrice" class="cart__price">
      <h3 class="cart__title">Total:</h3>
      <span class="cart__total">{{ formatedPrice }}</span>
    </div>

    <div v-if="confirmButton" class="cart__button">
      <ButtonUI
        :label="confirmButton"
        :disabled="!items.length"
        size="lg"
        full
        radius
        @click="() => $emit('cart:submit')"
      />
    </div>
  </div>
</template>

<style scoped>
.cart__container {
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 30px;
  align-items: stretch;
}

.cart__price,
.cart__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.cart__title,
.cart__price {
  font-size: 2rem;
}

.cart__total {
  font-weight: 900;
}

.cart__list {
  flex: 1;
  overflow-x: auto;
}

.cart__list--scroll {
  max-height: 400px;
}

.cart__clean {
  cursor: pointer;
  font-weight: 500;
  color: #6558f5;
}

.cart__clean:hover {
  text-decoration: underline;
}

.cart__clean:active {
  transform: scale(90%);
}
</style>

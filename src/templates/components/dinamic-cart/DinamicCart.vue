<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { TYPE, useToast } from "vue-toastification";
import { useCartStore } from "../../../stores/cart";

import type { CartItem } from "../../../components/shop/cart-list/CartList.vue";
import TheCart from "../../../components/shop/cart/TheCart.vue";
import { limStr } from "@/util/functions";

const cartStore = useCartStore();
const router = useRouter();
const toast = useToast();

const props = withDefaults(
  defineProps<{
    content: string;
    deleteFavorite: (id: number) => void;
  }>(),
  {
    content: "",
    deleteFavorite: (id: number) => {
      console.log(id);
    },
  }
);

const cart = reactive({
  title: "Meu Carrinho",
  header: false,
  big: false,
  addButton: true,
  confirmButton: "Finalizar Compra",
});

const favorites = reactive({
  title: "Favoritos",
  header: false,
  big: false,
  addButton: true,
});

const addItemToCart = (item: CartItem) => {
  cartStore.addToCart(item);
  toast(`${limStr(item.title)} adicionado ao carrinho.`, {
    type: TYPE.SUCCESS,
  });
};

const deleteItemCart = (item: CartItem) => {
  cartStore.deleteToCart(item.id);
  toast(`${limStr(item.title)} excluido do carrinho.`);
};

const deleteItemFavorites = (item: CartItem) => {
  cartStore.deleteToFavorites(item.id);
  props.deleteFavorite(item.id);
  toast(`${limStr(item.title)} excluido dos favoritos.`);
};

const clearCart = () => {
  cartStore.clear();
  toast("Seu carrinho agora está vazio!");
};

const clearFavorites = () => {
  cartStore.clear();
  toast("Seu carrinho agora está vazio!");
};

const toCheckout = () => {
  router.push({
    name: "checkout",
  });
};
</script>

<template>
  <TheCart
    v-if="content == 'cart'"
    v-bind="cart"
    :items="cartStore.getProducts"
    :total="cartStore.getTotal"
    :add-action="addItemToCart"
    :delete-action="deleteItemCart"
    @cart:clear="clearCart"
    @cart:submit="toCheckout"
  />

  <TheCart
    v-else
    v-bind="favorites"
    :items="cartStore.getFavorites"
    :add-action="addItemToCart"
    :delete-action="deleteItemFavorites"
    disable-qte
    disable-footer
    @cart:clear="clearFavorites"
    @cart:submit="toCheckout"
  />
</template>

<style></style>

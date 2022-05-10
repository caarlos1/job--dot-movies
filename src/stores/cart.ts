import type { CartItem } from "@/components/shop/cart-list/CartList.vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    items: [] as CartItem[],
    favorites: [] as CartItem[],
  }),
  getters: {
    getProducts: (state) => state.items,
    getFavorites: (state) => state.favorites,
    getCartItems: (state) => {
      let num = 0;
      state.items.forEach((i) => (num += i.num));
      return num;
    },
    getTotal: (state) => {
      let total = 0;
      state.items.forEach((i) => (total += i.price * i.num));
      return total;
    },
  },
  actions: {
    addToCart(item: CartItem) {
      const index = this.items.findIndex((i) => i.id == item.id);
      if (index == -1) this.items.push(item);
      else this.items[index].num++;
    },

    addToFavorites(item: CartItem) {
      const index = this.favorites.findIndex((i) => i.id == item.id);
      if (index == -1) this.favorites.push(item);
    },

    deleteToCart(id: number) {
      const index = this.items.findIndex((i) => i.id == id);
      if (index != -1) this.items.splice(index, 1);
    },

    deleteToFavorites(id: number) {
      const index = this.favorites.findIndex((i) => i.id == id);
      if (index != -1) this.favorites.splice(index, 1);
    },

    clear() {
      this.items = [];
    },
  },
});

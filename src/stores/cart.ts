import type { CartItem } from "@/components/shop/cart-list/CartList.vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    getProducts: (state) => state.items,
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

    deleteToCart(id: number) {
      const index = this.items.findIndex((i) => i.id == id);
      if (index != -1) this.items.splice(index, 1);
    },

    clear() {
      this.items = [];
    },
  },
});

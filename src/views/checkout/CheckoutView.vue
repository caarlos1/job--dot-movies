<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import RightSidebar from "../../templates/right-column/RightSidebar.vue";

import TheMenu, {
  type MenuProps,
} from "../../components/header/menu/TheMenu.vue";
import TheCart from "../../components/shop/cart/TheCart.vue";
import RegisterForm, {
  type RegisterFormData,
} from "../../components/form/RegisterForm.vue";
import { useCartStore } from "@/stores/cart";
import type { CartItem } from "@/components/shop/cart-list/CartList.vue";

const router = useRouter();
const cartStore = useCartStore();
const toast = useToast();

const page = reactive({
  showSidebar: false,
});

const form = reactive<{ register: RegisterFormData }>({
  register: {} as RegisterFormData,
});

const menu = reactive<MenuProps>({
  logo: {
    title: "Dot Movies",
    url: "home",
    logoImage: "",
    uppercase: true,
  },
});

const cart = reactive({
  title: "Carrinho",
  total: 0,
  header: true,
  big: true,
  addButton: true,
  items: [],
  confirmButton: "Finalizar",
});

const toogleSidebar = () => {
  page.showSidebar = !page.showSidebar;
};

const closeSidebar = () => {
  page.showSidebar = false;
};

const addItemToCart = (item: CartItem) => {
  cartStore.addToCart(item);
  toast(`Adicionado ao carrinho.`);
};

const deleteItemCart = (item: CartItem) => {
  cartStore.deleteToCart(item.id);
  toast(`${item.title} excluido do carrinho.`);
};

const clearCart = () => {
  cartStore.clear();
  toast("Seu carrinho agora está vazio!");
};

const searchMovies = (search = "") => {
  router.push({
    name: "home",
    query: {
      search,
    },
  });
};
</script>

<template>
  <RightSidebar v-bind="page" @template:colse-sidebar="closeSidebar">
    <template #header>
      <TheMenu
        v-bind="menu"
        :search-action="searchMovies"
        disable-cart
        @menu:open-cart="toogleSidebar"
      />
    </template>
    <template #content>
      <div class="page__container">
        <div class="page__checkout">
          <div class="w100">
            <RegisterForm v-model="form.register" />
          </div>

          <div class="w100">
            <TheCart
              v-bind="cart"
              :items="cartStore.getProducts"
              :total="cartStore.getTotal"
              :add-action="addItemToCart"
              :delete-action="deleteItemCart"
              scroll
              @cart:clear="clearCart"
              @cart:submit="() => {}"
            />
          </div>
        </div>
      </div>
    </template>
    <template #sidebar> </template>
  </RightSidebar>
</template>

<style scoped>
.page__checkout {
  display: flex;
  width: 100%;
  gap: 30px;
  max-width: 1200px;
  flex-direction: row;
}

.w100 {
  width: 100%;
}

@media (min-width: 1000px) {
  .page__container {
    height: 100%;
    flex: 1 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 1000px) {
  .page__checkout {
    flex-direction: column;
  }
}
</style>

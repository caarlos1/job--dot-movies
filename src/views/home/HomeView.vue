<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { ProductCardProps } from "@/components/shop/product-card/ProductCard.vue";
import type { MovieData, GenreData } from "@/services/types";

import { useToast, TYPE } from "vue-toastification";

import RightSidebar from "../../templates/right-column/RightSidebar.vue";

import TheMenu, {
  type MenuProps,
} from "../../components/header/menu/TheMenu.vue";
import ProductGrid from "../../components/shop/product-grid/ProductGrid.vue";
import TheCart from "../../components/shop/cart/TheCart.vue";

import { genresAPI, moviesAPI } from "@/services";
import { moviesAdapter } from "../../util/adapters/movies";
import { useCartStore } from "@/stores/cart";
import type { CartItem } from "@/components/shop/cart-list/CartList.vue";
import { cartItemAdapter } from "@/util/adapters/cart";
import { takeABreak } from "@/util/functions";

const route = useRoute();
const router = useRouter();

const cartStore = useCartStore();
const toast = useToast();

interface RequestReactive {
  movies: MovieData[];
  genres: GenreData[];
}

const reqData = reactive<RequestReactive>({
  movies: [],
  genres: [],
});

const page = reactive({
  showSidebar: false,
});

const menu = reactive<MenuProps>({
  logo: {
    title: "Dot Movies",
    url: "home",
    logoImage: "",
    uppercase: true,
  },
});

const products = reactive({
  page: 0,
  title: "",
  loading: false,
  products: [] as ProductCardProps[],
  requestButton: "Carregar mais Filmes",
});

const cart = reactive({
  title: "Meu Carrinho",
  header: false,
  big: false,
  addButton: true,
  confirmButton: "Finalizar Compra",
});

onMounted(async () => {
  await requestPageData();
});

watch(
  () => route.query,
  async () => {
    products.products = [];
    products.page = 0;
    requestPageData();
  }
);

const toogleSidebar = () => {
  page.showSidebar = !page.showSidebar;
};

const closeSidebar = () => {
  page.showSidebar = false;
};

const requestPageData = async () => {
  products.loading = true;
  products.page++;

  try {
    if (!reqData.genres.length) reqData.genres = await genresAPI.all();

    if (route.query && route.query.search) {
      products.title = `Resulados para:  ${route.query.search}`;
      reqData.movies = (
        await moviesAPI.search(route.query.search as string, products.page)
      ).results;
    } else {
      products.title = "";
      reqData.movies = (await moviesAPI.popular(products.page)).results;
    }

    const movies = moviesAdapter(reqData.movies, reqData.genres);

    for (const movie of movies) {
      await takeABreak(150);
      products.products.push(movie);
    }

    await takeABreak(100);
    products.loading = false;
  } catch (err) {
    products.loading = false;
    console.log(err);
  }
};

const addProductToCart = (product: ProductCardProps) => {
  page.showSidebar = true;
  cartStore.addToCart(cartItemAdapter(product));
  toast(`${product.title} adicionado ao carrinho!`, {
    type: TYPE.SUCCESS,
  });
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

const toCheckout = () => {
  router.push({
    name: "checkout",
  });
};
</script>

<template>
  <RightSidebar v-bind="page" @template:colse-sidebar="closeSidebar">
    <template #header>
      <TheMenu
        v-bind="menu"
        :search-action="searchMovies"
        :cart-items="cartStore.getCartItems"
        @menu:open-cart="toogleSidebar"
      />
    </template>
    <template #content>
      <div class="home__products">
        <ProductGrid
          v-bind="products"
          @grid:load-more="requestPageData"
          :add-action="addProductToCart"
        />
      </div>
    </template>
    <template #sidebar>
      <TheCart
        v-bind="cart"
        :items="cartStore.getProducts"
        :total="cartStore.getTotal"
        :add-action="addItemToCart"
        :delete-action="deleteItemCart"
        @cart:clear="clearCart"
        @cart:submit="toCheckout"
      />
    </template>
  </RightSidebar>
</template>

<style scoped>
.home__products {
  flex: 1;
}
</style>

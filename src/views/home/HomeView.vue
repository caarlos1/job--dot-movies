<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { ProductCardProps } from "@/components/shop/product-card/ProductCard.vue";
import type { MovieData, GenreData } from "@/services/types";

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

const route = useRoute();
const router = useRouter();

const cartStore = useCartStore();

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
  page: 1,
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
  try {
    reqData.genres = await genresAPI.all();

    if (route.query && route.query.search)
      reqData.movies = (
        await moviesAPI.search(route.query.search as string)
      ).results;
    else reqData.movies = (await moviesAPI.popular()).results;

    setTimeout(() => {
      products.products = moviesAdapter(reqData.movies, reqData.genres);
      products.loading = false;
    }, 500);
  } catch (err) {
    products.loading = false;
    console.log(err);
  }
};

const loadMoreMovies = async () => {
  if (products.loading) return;

  try {
    products.loading = true;
    products.page++;

    if (!route.query.search)
      reqData.movies = (await moviesAPI.popular(products.page)).results;
    else
      reqData.movies = (
        await moviesAPI.search(route.query.search as string, products.page)
      ).results;

    setTimeout(() => {
      products.products.push(...moviesAdapter(reqData.movies, reqData.genres));
      products.loading = false;
    }, 500);
  } catch (err) {
    products.loading = false;
    console.log(err);
  }
};

const addProductToCart = (product: ProductCardProps) => {
  page.showSidebar = true;
  cartStore.addToCart(cartItemAdapter(product));
};

const addItemToCart = (item: CartItem) => {
  cartStore.addToCart(item);
};

const deleteItemCart = (item: CartItem) => {
  cartStore.deleteToCart(item.id);
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
          @grid:load-more="loadMoreMovies"
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
        @cart:clear="cartStore.clear"
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

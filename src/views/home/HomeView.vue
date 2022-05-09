<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { ProductCardProps } from "@/components/shop/product-card/ProductCard.vue";
import type { MovieData, GenreData } from "@/services/types";

import RightSidebar from "../../templates/right-column/RightSidebar.vue";
import TheMenu, {
  type MenuProps,
} from "../../components/header/menu/TheMenu.vue";
import ProductGrid, {
  type ProductGridProps,
} from "../../components/shop/product-grid/ProductGrid.vue";
import TheCart from "../../components/shop/cart/TheCart.vue";

import { genresAPI, moviesAPI } from "@/services";
import { moviesAdapter } from "../../util/adapters/movies";

const route = useRoute();
const router = useRouter();

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

const products = reactive<ProductGridProps>({
  page: 1,
  loading: false,
  products: [] as ProductCardProps[],
  requestButton: "Carregar mais Filmes",
});

const cart = reactive({
  title: "Meu Carrinho",
  total: 0,
  header: false,
  big: true,
  addButton: true,
  items: [],
  confirmButton: "Finalizar Compra",
});

const toogleSidebar = () => {
  page.showSidebar = !page.showSidebar;
};

const closeSidebar = () => {
  page.showSidebar = false;
};

onMounted(async () => {
  products.loading = true;
  requestPageData();
  products.loading = false;
});

watch(
  () => route.query,
  async () => {
    requestPageData();
  }
);

const requestPageData = async () => {
  try {
    reqData.genres = await genresAPI.all();

    if (route.query && route.query.search)
      reqData.movies = (
        await moviesAPI.search(route.query.search as string)
      ).results;
    else reqData.movies = (await moviesAPI.popular()).results;

    products.products = moviesAdapter(reqData.movies, reqData.genres);
  } catch (err) {
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

    products.products.push(...moviesAdapter(reqData.movies, reqData.genres));
  } catch (err) {
    console.log(err);
  }

  products.loading = false;
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
        @menu:open-cart="toogleSidebar"
        :search-action="searchMovies"
      />
    </template>
    <template #content>
      <div>
        <ProductGrid v-bind="products" @grid:load-more="loadMoreMovies" />
      </div>
    </template>
    <template #sidebar>
      <TheCart v-bind="cart" />
    </template>
  </RightSidebar>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import RightSidebar from "../../templates/right-column/RightSidebar.vue";
import TheMenu, {
  type MenuProps,
} from "../../components/header/menu/TheMenu.vue";
import ProductGrid, {
  type ProductGridProps,
} from "../../components/shop/product-grid/ProductGrid.vue";
import TheCart from "../../components/shop/cart/TheCart.vue";
import { genresAPI, moviesAPI } from "@/services";
import type { ProductCardProps } from "@/components/shop/product-card/ProductCard.vue";
import type { MovieData, GenreData } from "@/services/types";
import { moviesAdapter } from "../../util/adapters/movies";

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
    url: "",
    logoImage: "",
    uppercase: true,
  },
});

const productGrid = reactive<ProductGridProps>({
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
  try {
    reqData.genres = await genresAPI.all();
    reqData.movies = (await moviesAPI.popular()).results;
    productGrid.products = moviesAdapter(reqData.movies, reqData.genres);
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <RightSidebar v-bind="page" @template:colse-sidebar="closeSidebar">
    <template #header>
      <TheMenu
        v-bind="menu"
        :search-action="() => {}"
        @menu:open-cart="toogleSidebar"
      />
    </template>
    <template #content>
      <div>
        <ProductGrid v-bind="productGrid" />
      </div>
    </template>
    <template #sidebar>
      <TheCart v-bind="cart" />
    </template>
  </RightSidebar>
</template>

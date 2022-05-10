<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TYPE, useToast } from "vue-toastification";

import type { ProductCardProps } from "@/components/shop/product-card/ProductCard.vue";
import type { MovieData, GenreData } from "@/services/types";

import RightSidebar from "../../templates/right-column/RightSidebar.vue";

import TheMenu, {
  type MenuProps,
} from "../../components/header/menu/TheMenu.vue";
import ProductGrid from "../../components/shop/product-grid/ProductGrid.vue";
import DinamicCart from "../../templates/components/dinamic-cart/DinamicCart.vue";

import { genresAPI, moviesAPI } from "@/services";
import { useCartStore } from "@/stores/cart";
import { moviesAdapter } from "../../util/adapters/movies";
import { takeABreak } from "@/util/functions";
import { cartItemAdapter } from "@/util/adapters/cart";

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
  sidebarContent: "cart",
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

const defineSidebarContent = (newContent: string, oldContent: string) => {
  if (newContent == oldContent) page.showSidebar = !page.showSidebar;
  else {
    page.showSidebar = true;
    page.sidebarContent = newContent;
  }
};
const toogleSidebarCart = () => {
  const newContent = "cart";
  defineSidebarContent(newContent, page.sidebarContent);
};

const toogleSidebarFavorites = () => {
  const newContent = "favorites";
  defineSidebarContent(newContent, page.sidebarContent);
};

const closeSidebar = () => {
  page.showSidebar = false;
};

const addProductToCart = (product: ProductCardProps) => {
  cartStore.addToCart(cartItemAdapter(product));
  toast(`${product.title} adicionado ao carrinho!`, {
    type: TYPE.SUCCESS,
  });
};

const addProductToFavorites = (product: ProductCardProps) => {
  cartStore.addToFavorites(cartItemAdapter(product));
  toast(`${product.title} adicionado aos favoritos!`, {
    type: TYPE.SUCCESS,
  });
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
  <RightSidebar v-bind="page" @template:close-sidebar="closeSidebar">
    <template #header>
      <TheMenu
        v-bind="menu"
        :search-action="searchMovies"
        :cart-items="cartStore.getCartItems"
        @menu:open-cart="toogleSidebarCart"
        @menu:open-favorite="toogleSidebarFavorites"
      />
    </template>
    <template #content>
      <div class="home__products">
        <ProductGrid
          v-bind="products"
          @grid:load-more="requestPageData"
          :add-product="addProductToCart"
          :add-favorite="addProductToFavorites"
        />
      </div>
    </template>
    <template #sidebar>
      <DinamicCart :content="page.sidebarContent" />
    </template>
  </RightSidebar>
</template>

<style scoped>
.home__products {
  flex: 1;
}
</style>

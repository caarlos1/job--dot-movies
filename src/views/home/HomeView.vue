<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TYPE, useToast } from "vue-toastification";

import type { ProductCardProps } from "@/components/shop/product-card/ProductCard.vue";

import RightSidebar from "../../templates/right-column/RightSidebar.vue";

import TheMenu, {
  type MenuProps,
} from "../../components/header/menu/TheMenu.vue";
import ProductGrid from "../../components/shop/product-grid/ProductGrid.vue";
import DinamicCart from "../../templates/components/dinamic-cart/DinamicCart.vue";

import { useCartStore } from "@/stores/cart";

import { cartItemAdapter } from "@/util/adapters/cart";
import { useMovieStore } from "@/stores/movie";
import { limStr } from "@/util/functions";

const route = useRoute();
const router = useRouter();

const cartStore = useCartStore();
const movieStore = useMovieStore();
const toast = useToast();

const page = reactive({
  showSidebar: false,
  sidebarContent: "cart",
  count: 1,
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
  await requestData();
});

watch(
  () => route.query,
  async () => {
    products.products = [];
    products.page = 0;
    requestData();
  }
);

const requestData = async (manual = false) => {
  products.loading = true;

  let search = "";

  if (route.query && route.query.search) {
    products.title = `Resulados para:  ${route.query.search}`;
    search = route.query.search as string;
  } else products.title = "";

  await movieStore.requestMovies(cartStore.getFavorites, search, manual);

  products.loading = false;
};

const buttonRequest = () => {
  return requestData(true);
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
  toast(`${limStr(product.title)} adicionado ao carrinho!`, {
    type: TYPE.SUCCESS,
  });
};

const deleteFavoriteFromMovies = (id: number) => {
  movieStore.toogleMovieFavorite(id, false);
};

const toogleMovieFavorite = (movie: ProductCardProps) => {
  const state = !movie.liked;

  if (state) cartStore.addToFavorites(cartItemAdapter(movie));
  else cartStore.deleteToFavorites(movie.id);

  movieStore.toogleMovieFavorite(movie.id, state);

  const alert = `${limStr(movie.title)} ${
    state ? "adicionado aos" : "removido dos"
  } favoritos!`;

  toast(alert, {
    type: state ? TYPE.SUCCESS : TYPE.DEFAULT,
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
          :products="movieStore.getMovies"
          @grid:load-more="buttonRequest"
          :add-product="addProductToCart"
          :add-favorite="toogleMovieFavorite"
        />
      </div>
    </template>
    <template #sidebar>
      <DinamicCart
        :content="page.sidebarContent"
        :delete-favorite="deleteFavoriteFromMovies"
      />
    </template>
  </RightSidebar>
</template>

<style scoped>
.home__products {
  flex: 1;
}
</style>

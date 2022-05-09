<script setup lang="ts">
import { reactive } from "vue";
import type { LogoProps } from "../logo/TheLogo.vue";
import TheLogo from "../logo/TheLogo.vue";
import InputSearchUI from "../../ui/input-search/InputSearchUI.vue";
import { HeartIcon, CartIcon } from "../../icons";
import SearchIcon from "../../icons/SearchIcon.vue";

export interface MenuProps {
  logo: LogoProps;
  cartItems?: number;
  searchAction?: (s: string) => void;
}

const props = withDefaults(defineProps<MenuProps>(), {
  searchAction: (s: string) => {
    console.log(s);
  },
});

defineEmits(["menu:open-favorite", "menu:open-cart"]);

const page = reactive({
  searchArea: false,
});

const searchSubmit = (s: string) => {
  if (props.searchAction) props.searchAction(s);
  page.searchArea = false;
};

const toggleSearch = () => {
  page.searchArea = !page.searchArea;
};
</script>

<template>
  <div class="menu__container">
    <TheLogo v-bind="logo" />
    <div class="menu__search">
      <div class="search__box" :class="{ page__hover: page.searchArea }">
        <div class="click-area" @click="() => toggleSearch()"></div>
        <span class="search__input"
          ><InputSearchUI @input-search:submit="searchSubmit"
        /></span>
      </div>
    </div>
    <div class="menu__icons">
      <SearchIcon class="action search-icon" @click="() => toggleSearch()" />
      <HeartIcon class="action" @click="() => $emit('menu:open-favorite')" />
      <div class="cart__container">
        <CartIcon class="action" @click="() => $emit('menu:open-cart')" />
        <div v-if="cartItems" class="cart__items">{{ cartItems }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu__container {
  display: flex;
  width: 100%;
  padding: 10px 25px;
  background: #8dd7cf;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.menu__search {
  width: 400px;
}

.search__box {
  width: 100%;
}

.search__input {
  width: 100%;
}

.menu__icons {
  display: flex;
  align-items: center;
  gap: 20px;
}

.menu__icons svg {
  height: 3rem;
  fill: #fff;
}

.menu__icons .action {
  cursor: pointer;
  transition: all 150ms ease;
}

.menu__icons .action:hover {
  transform: scale(120%);
}

.menu__icons .action:active {
  transform: scale(110%);
}

.search-icon {
  display: none;
}

@media (max-width: 400px) {
  .search-icon {
    display: block;
  }
}
.cart__container {
  position: relative;
}

.cart__items {
  position: absolute;
  right: -8px;
  top: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  background-color: #fbe192;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 50%;
}

@media (max-width: 800px) {
  .search-icon {
    display: block;
  }

  .menu__icons svg {
    height: 2.5rem;
  }

  .search__box {
    display: none;
  }

  .page__hover {
    z-index: 30;
    position: fixed;
    display: flex;
    align-items: center;
    padding: 25px;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: #ffffff80;
  }

  .click-area {
    position: absolute;
    height: 100vh;
    width: 100vw;
  }

  .page__hover .search__input {
    z-index: 40;
  }

  .page__hover .search__title {
    display: block;
    padding-bottom: 10px;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: 500;
  }
}
</style>

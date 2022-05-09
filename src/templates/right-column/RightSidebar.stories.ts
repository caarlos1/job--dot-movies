import RightSidebar from "./RightSidebar.vue";
import TheMenu from "../../components/header/menu/TheMenu.vue";
import TheCart from "../../components/shop/cart/TheCart.vue";
import ProductGrid from "../../components/shop/product-grid/ProductGrid.vue";

import { logo } from "../../components/header/logo/util/mock";
import { cart } from "../../components/shop/cart/util/mock";
import { productList } from "../../components/shop/product-grid/util/mock";

export default {
  title: "Template / RightSidebar",
  component: RightSidebar,
  args: {
    menu: {
      logo,
      cartItems: 10,
    },
    cart: {
      ...cart,
      header: false,
    },
    body: {
      products: productList(12),
    },
    showSidebar: false,
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { RightSidebar, TheMenu, TheCart, ProductGrid },
  setup() {
    return { args };
  },
  template: `
    <div class="">
      <RightSidebar v-bind="args">
        <template #header>
          <TheMenu :logo="args.menu.logo" />
        </template>
        <template #content>
          <ProductGrid v-bind="args.body" />
        </template>
        <template #sidebar>
          <TheCart v-bind="args.cart" />
        </template>
      </RightSidebar>
    </div>
  `,
});

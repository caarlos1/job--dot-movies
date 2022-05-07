import RightSidebar from "./RightSidebar.vue";
import TheMenu from "../../components/header/menu/TheMenu.vue";
import CartList from "../../components/shop/cart-list/CartList.vue";

import { logo } from "../../components/header/logo/util/mock";
import { items } from "../../components/shop/cart-list/util/mock";

export default {
  title: "Template / RightSidebar",
  component: RightSidebar,
  args: {
    menu: {
      logo,
      cartItems: 10,
    },
    cart: {
      items,
    },
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { RightSidebar, TheMenu, CartList },
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
          Teste
        </template>
        <template #sidebar>
          Meu Carrinho
          <CartList :items="args.cart.items">
        </template>
      <RightSidebar />
    </div>
  `,
});

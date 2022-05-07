import CartList from "./CartList.vue";
import { cartList } from "./util/mock";
import "./util/storybook.css";

export default {
  title: "Shop / CartList",
  component: CartList,
  args: {
    ...cartList,
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { CartList },
  setup() {
    return { args };
  },
  template: `
    <div class="cart-list--storybook">
      <CartList v-bind="args" />
    </div>
  `,
});

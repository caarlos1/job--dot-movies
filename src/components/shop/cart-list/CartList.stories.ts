import CartList from "./CartList.vue";
import { items } from "./util/mock";
import "./util/storybook.css";

export default {
  title: "Shop / CartList",
  component: CartList,
  args: {
    header: true,
    addButton: true,
    big: false,
    items: [...items],
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

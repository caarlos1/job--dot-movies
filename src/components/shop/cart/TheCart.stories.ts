import TheCart from "./TheCart.vue";
import { cart } from "./util/mock";
import "./util/storybook.css";

export default {
  title: "Shop / TheCart",
  component: TheCart,
  args: {
    ...cart,
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { TheCart },
  setup() {
    return { args };
  },
  template: `
    <div class="cart-list--storybook">
      <TheCart v-bind="args" />
    </div>
  `,
});

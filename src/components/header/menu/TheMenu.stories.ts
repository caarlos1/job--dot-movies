import TheMenu from "./TheMenu.vue";
import { logo } from "../logo/util/mock";
import "./util/storybook.css";

export default {
  title: "Header / TheMenu",
  component: TheMenu,
  args: {
    logo,
    cartItems: 10,
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { TheMenu },
  setup() {
    return { args };
  },
  template: `
    <div class="menu--storybook">
      <TheMenu :logo="args.logo" :cart-items="args.cartItems" />
    </div>
  `,
});

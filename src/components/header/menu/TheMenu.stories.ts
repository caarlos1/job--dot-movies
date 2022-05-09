import TheMenu from "./TheMenu.vue";
import { logo } from "../logo/util/mock";

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
    <div class="default--storybook no-p">
      <TheMenu :logo="args.logo" :cart-items="args.cartItems" />
    </div>
  `,
});

import ProductCard from "./ProductCard.vue";
import { product } from "./util/mock";

export default {
  title: "Shop / ProductCard",
  component: ProductCard,
  args: {
    ...product,
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { ProductCard },
  setup() {
    return { args };
  },
  template: `
    <div class="default--storybook w-350">
      <ProductCard v-bind="args" />
    </div>
  `,
});

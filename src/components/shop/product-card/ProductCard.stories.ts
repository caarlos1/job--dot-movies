import ProductCard from "./ProductCard.vue";
import { product } from "./util/mock";
import "./util/storybook.css";

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
    <div class="product-card--storybook">
      <ProductCard v-bind="args" />
    </div>
  `,
});

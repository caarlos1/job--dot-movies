import ProductGrid from "./ProductGrid.vue";
import { productList } from "./util/mock";
import "./util/storybook.css";

export default {
  title: "Shop / ProductGrid",
  component: ProductGrid,
  args: {
    products: productList(12),
    requestButton: "Carregar mais...",
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { ProductGrid },
  setup() {
    return { args };
  },
  template: `
    <div class="product-grid-card--storybook">
      <ProductGrid v-bind="args" />
    </div>
  `,
});

export const Empty = () => ({
  components: { ProductGrid },
  setup() {
    return {
      args: {
        products: [],
      },
    };
  },
  template: `
    <div class="product-grid-card--storybook">
      <ProductGrid v-bind="args" />
    </div>
  `,
});

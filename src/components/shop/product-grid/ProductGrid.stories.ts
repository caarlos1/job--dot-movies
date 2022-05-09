import ProductGrid from "./ProductGrid.vue";
import { productList } from "./util/mock";

export default {
  title: "Shop / ProductGrid",
  component: ProductGrid,
  args: {
    products: productList(12),
    loading: false,
    title: "",
    requestButton: "Carregar mais...",
    emptyText: "",
    page: 1,
  },
  argTypes: {
    title: { type: "string" },
    page: { type: "number" },
    loading: { type: "boolean" },
  },
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
    <div class="default--storybook">
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
    <div class="default--storybook">
      <ProductGrid v-bind="args" />
    </div>
  `,
});

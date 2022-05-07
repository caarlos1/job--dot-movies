import ProductCard from "./ProductCard.vue";
import "./util/storybook.css";

export default {
  title: "Shop / ProductCard",
  component: ProductCard,
  args: {
    id: 1,
    title: "Doutor Estranho",
    cover: "https://picsum.photos/300/300",
    date: "7 de Janeiro, 2019",
    genre: "Terror",
    stars: 7,
    price: 80,
    addButton: "Adicionar",
    liked: true,
    disabled: false,
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

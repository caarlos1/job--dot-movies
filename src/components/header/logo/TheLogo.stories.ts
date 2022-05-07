import TheLogo from "./TheLogo.vue";
import "./util/storybook.css";

export default {
  title: "Header / TheLogo",
  component: TheLogo,
  args: {
    title: "dot",
    logoImage:
      "https://dotgroup.com.br/wp-content/uploads/2021/06/logo-dot2021-vermelho.png",
    uppercase: true,
    url: "",
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { TheLogo },
  setup() {
    return { args };
  },
  template: `
    <div class="logo--storybook">
      <TheLogo v-bind="args" />
    </div>
  `,
});

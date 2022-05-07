import InputSearchUI from "./InputSearchUI.vue";
import "./util/storybook.css";

export default {
  title: "UI / InputSearchUI",
  component: InputSearchUI,
  args: {
    placeholder: "Pesquisar",
  },
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { InputSearchUI },
  setup() {
    return { args };
  },
  template: `
    <div class="input-search-ui--storybook">
      <InputSearchUI v-bind="args" />
    </div>
  `,
});

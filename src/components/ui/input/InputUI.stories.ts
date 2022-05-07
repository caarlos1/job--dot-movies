import InputUI from "./InputUI.vue";
import "./util/storybook.css";

export default {
  title: "UI / InputUI",
  component: InputUI,
  args: {
    id: "default",
    label: "Look this Input:",
    placeholder: "Bla, bla, bla... Placeholder.",
    type: "text",
    mask: "(##)  ####-####, (##) # ####-####",
  },
  argTypes: {
    id: { type: "string" },
    label: { type: "string" },
    type: { type: "string" },
    mask: { type: "string" },
  },
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: { mask: string }) => ({
  components: { InputUI },
  setup() {
    return {
      args: {
        ...args,
        mask: args.mask
          .trim()
          .split(",")
          .map((i) => i.trim()),
      },
    };
  },
  template: `
    <div class="input-ui--storybook">
      <InputUI v-bind="args" />
    </div>
  `,
});

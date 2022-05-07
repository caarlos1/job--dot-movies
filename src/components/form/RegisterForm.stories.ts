import RegisterForm from "./RegisterForm.vue";
import "./util/storybook.css";

export default {
  title: "FORM / RegisterForm",
  component: RegisterForm,
  args: {},
  argTypes: {},
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
};

export const Component = (args: unknown) => ({
  components: { RegisterForm },
  setup() {
    return { args };
  },
  template: `
    <div class="register-form--storybook">
      <RegisterForm v-bind="args" />
    </div>
  `,
});

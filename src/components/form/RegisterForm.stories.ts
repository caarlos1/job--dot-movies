import { reactive } from "vue";
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
    const form = reactive({});
    return { args, form };
  },
  template: `
    <div class="register-form--storybook">
      <RegisterForm v-bind="args" v-model="form" />
    </div>
  `,
});

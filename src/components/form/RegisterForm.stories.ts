import { reactive } from "vue";
import RegisterForm from "./RegisterForm.vue";

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
    <div class="default--storybook w-500">
      <RegisterForm v-bind="args" v-model="form" />
    </div>
  `,
});

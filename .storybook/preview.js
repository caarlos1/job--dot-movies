export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

import "../src/assets/reset.css";
import "../src/assets/root.css";

export const decorators = [
  (story) => ({
    components: { story },
    template: `<story />`,
  }),
];

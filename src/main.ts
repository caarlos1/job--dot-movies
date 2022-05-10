import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast, { type PluginOptions, POSITION } from "vue-toastification";

import "vue-toastification/dist/index.css";

const toastOptions: PluginOptions = {
  position: POSITION.BOTTOM_LEFT,
};

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, toastOptions);

app.mount("#app");

import { createApp } from "vue";
import { createPinia } from "pinia";
import Maska from "maska";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(Maska);
app.use(router);

app.mount("#app");

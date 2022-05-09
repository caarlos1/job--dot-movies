import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/checkout/CheckoutView.vue"),
    },
  ],
});

export default router;

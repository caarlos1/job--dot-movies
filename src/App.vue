<script setup lang="ts">
import { RouterView } from "vue-router";

import "@/assets/reset.css";
import "@/assets/root.css";

import ModalFactory from "./components/modal/modal-factory/ModalFactory.vue";
</script>

<template>
  <ModalFactory />
  <transition name="route">
    <RouterView />
  </transition>
</template>

<style>
#app {
  min-height: 100vh;
  min-width: 100vw;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.5s ease;
  opacity: 0.1;
}
.route-enter-from,
.route-leave-to {
  opacity: 0;
}
</style>

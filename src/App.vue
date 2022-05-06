<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import "@/assets/reset.css";
import "@/assets/root.css";
</script>

<template>
  <div class="page--app">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Início</RouterLink>
          <RouterLink to="/checkout">Checkout</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style>
#app {
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
}

.wrapper nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.page--app {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
</style>

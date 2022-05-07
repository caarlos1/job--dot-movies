<script setup lang="ts">
defineProps({
  sidebar: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["right-sidebar:open-sidebar"]);
</script>

<template>
  <div class="right-sidebar__container">
    <div class="header__template">
      <slot name="header"></slot>
    </div>
    <div class="body__template">
      <div class="body__content">
        <slot name="content"></slot>
      </div>
      <div class="body__sidebar">
        <slot name="sidebar"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.right-sidebar__container {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.header__template {
  width: 100%;
}

.body__template {
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
}

.body__content {
  padding: 20px;
}

.body__sidebar {
  z-index: 20;
  min-width: 400px;
  min-height: 100%;
  overflow-y: auto;
  padding: 20px;
  border-left: 2px solid #c3cfd9;
}
</style>

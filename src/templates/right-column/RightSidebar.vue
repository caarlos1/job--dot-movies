<script setup lang="ts">
import CloseIcon from "../../components/icons/CloseIcon.vue";

defineProps({
  showSidebar: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["template:colse-sidebar"]);
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
      <div v-show="showSidebar" class="body__sidebar">
        <div class="sidebar__close">
          <CloseIcon @click="() => $emit('template:colse-sidebar')" />
        </div>
        <div class="body__slot-area">
          <slot name="sidebar"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.right-sidebar__container {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
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
}

.body__content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.body__sidebar {
  z-index: 20;
  width: 450px;
  max-width: 450px;
  min-height: 100%;
  overflow-y: auto;
  padding: 20px;
  border-left: 2px solid #c3cfd970;
}

.body__slot-area {
  height: 100%;
  width: 100%;
}
.sidebar__close svg {
  display: none;
}

@media (max-width: 768px) {
  .body__sidebar {
    padding: 70px 30px 30px 30px;
    position: fixed;
    height: 100vh;
    width: 100vw;
    max-width: 100vw;
    left: 0;
    top: 0;
    background: hwb(0 100% 0% / 0.98);
  }

  .body__slot-area {
    height: 100%;
    width: 100%;
  }

  .sidebar__close svg {
    position: fixed;
    height: 30px;
    display: block;
    top: 20px;
    right: 30px;
    transition: all 100ms ease;
    fill: var(--color-text);
    cursor: pointer;
  }

  .sidebar__close svg:hover {
    transform: scale(120%);
  }

  .sidebar__close svg:active {
    transform: scale(110%);
  }
}

@media (max-width: 400px) {
  .body__sidebar {
    padding: 55px 15px 15px 15px;
  }

  .sidebar__close svg {
    top: 15px;
    right: 15px;
  }
}
</style>

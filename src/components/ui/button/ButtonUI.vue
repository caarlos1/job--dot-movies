<script setup lang="ts">
import { computed } from "vue";

export type ButtonUIProps = {
  label: string;
  design?: string;
  full?: boolean;
  disabled?: boolean;
};

const props = withDefaults(defineProps<ButtonUIProps>(), {
  design: "",
  full: false,
  disabled: false,
});

const computedClass = computed(() => {
  const { disabled, full, design } = props;
  return { design, disabled, full };
});
</script>

<template>
  <button
    v-bind="props"
    class="button-ui"
    :class="{ ...computedClass, [props.design]: true }"
    data-test="button-ui"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.button-ui {
  background: #605bff;
  padding: 10px 20px;
  border: none;
  color: #fff;
  border-radius: 8px;
  transition: 0.1s;
  height: 40px;
}

.button-ui:hover {
  background: #554fff;
  cursor: pointer;
  filter: drop-shadow(4px 4px 0px #1e1a6134);
}

.button-ui:active {
  transform: translateY(2px);
}

.button-ui.full {
  width: 100%;
}

.button-ui:disabled {
  opacity: 0.5;
  filter: none;
}

.button-ui:disabled:active {
  transform: none;
}

.button-ui:disabled:hover {
  background: #605bff;
  cursor: default;
}
</style>

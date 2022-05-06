<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  id: String,
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div class="input-ui__container">
    <label class="input-ui__label" v-if="props.label" :for="props.id">
      {{ props.label }}
    </label>
    <input class="input-ui__input" v-bind="props" v-model="inputValue" />
  </div>
</template>

<style scoped>
.input-ui__container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-ui__label {
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: 500;
}

.input-ui__input {
  background-color: #fafafb;
  border: 1px solid #eaeaea;
  height: 40px;
  border-radius: 5px;
  text-indent: 15px;
}

.input-ui__input:focus {
  outline: none;
  border: 1px solid #615cff7c;
}

.input-ui__input [type="date"],
.input-ui__input [type="time"] {
  padding: 0px 15px;
  text-indent: 0;
}

.input-ui__input [type="number"] {
  padding: 0px 15px;
  text-indent: 0;
}
</style>

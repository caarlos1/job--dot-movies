<script setup lang="ts">
import { reactive, onMounted } from "vue";
import ButtonUI from "../../ui/button/ButtonUI.vue";

export interface GenericModalProps {
  title: string;
  body: string;
  button?: string;
  size?: string;
  alignCenter?: boolean;
  buttonAction?: () => void;
}

const props = withDefaults(defineProps<GenericModalProps>(), {
  title: "",
  body: "",
  button: "",
  size: "",
  alignCenter: false,
  buttonAction: () => {
    return;
  },
});
</script>

<template>
  <div
    class="modal__container"
    :class="{ 'modal__container--center': alignCenter, [props.size]: true }"
  >
    <h2 class="modal__title">{{ title }}</h2>
    <div class="modal__body">
      {{ body }}
    </div>
    <ButtonUI
      v-if="button"
      :label="button"
      radius
      size="lg"
      @click="buttonAction"
    />
  </div>
</template>

<style scoped>
.modal__container {
  width: 100%;
  border: 1px solid blue;
  display: flex;
  padding: 20px;
  border: 2px solid #dee4edca;
  background: #fff;
  border-radius: 10px;
  flex-direction: column;
}

.modal__container--center {
  text-align: center;
}
.modal__title {
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 700;
  padding-bottom: 20px;
}

.modal__body {
  padding-bottom: 30px;
}

.modal__container {
  max-width: 400px;
}

.lg {
  max-width: 600px;
}
</style>

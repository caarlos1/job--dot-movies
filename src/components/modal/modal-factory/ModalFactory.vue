<script setup lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  reactive,
  defineAsyncComponent,
  computed,
} from "vue";

import { useModal } from "../../../hooks/useModal";

export interface ModalStateInterface<T> {
  name: string;
  status?: boolean;
  props: T;
}

const AsyncModal = (path: string) =>
  defineAsyncComponent({
    loader: () => import(path),
  });

const modal = useModal();

const modalList = [
  {
    name: "generic",
    path: "../generic-modal/GenericModal.vue",
  },
];

const modalPath = computed(() => {
  const modalName = modalList.find((list) => list.name == modalState.name);
  if (modalName && modalName.path) return modalName.path;
  else return "";
});

const modalState = reactive<ModalStateInterface<unknown>>({
  name: "",
  status: false,
  props: {},
});

onMounted(() => {
  modal.listen(handleModalToogle);
});

onBeforeUnmount(() => {
  modal.off(handleModalToogle);
});

const handleModalToogle = (payload: ModalStateInterface<unknown>) => {
  if (payload.status) {
    modalState.name = payload.name;
    modalState.props = payload.props;
  } else {
    modalState.name = "";
    modalState.props = {};
  }
  modalState.status = payload.status;
};

const closeModal = () => {
  modal.close();
};
</script>

<template>
  <div v-show="modalState.status && modalPath" class="modal-factory__container">
    <Component
      class="modal__dinamic"
      v-if="modalPath"
      :is="AsyncModal(modalPath)"
      v-bind="modalState.props"
    />
    <div class="modal__exit" @click="closeModal"></div>
  </div>
</template>

<style scoped>
.modal-factory__container {
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background: #acc8cb8e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.modal__dinamic {
  z-index: 120;
}
.modal__exit {
  position: fixed;
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 90;
}
</style>

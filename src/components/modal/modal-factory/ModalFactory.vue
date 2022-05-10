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

const modal = useModal();

const modalList = [
  {
    name: "generic",
    component: defineAsyncComponent({
      loader: () => import("../generic-modal/GenericModal.vue"),
    }),
  },
];

const DinamicComponent = computed(() => {
  return modalList.find((list) => list.name == modalState.name)?.component;
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
  <Transition name="modal">
    <div v-show="modalState.status" class="modal-factory__container">
      <DinamicComponent
        v-if="DinamicComponent"
        class="modal__dinamic"
        v-bind="modalState.props"
      />
      <div class="modal__exit" @click="closeModal"></div>
    </div>
  </Transition>
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

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

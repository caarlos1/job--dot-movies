<script setup lang="ts">
import { reactive, onMounted } from "vue";
import InputUI from "../ui/input/InputUI.vue";

defineProps({});
const data = reactive({});

onMounted(() => {
  console.log(data);
});
</script>

<template>
  <div class="register__container">
    <InputUI placeholder="Nome Completo" />
    <div class="col-50">
      <InputUI placeholder="CPF" mask="###.###.###-##" />
      <InputUI
        placeholder="Celular"
        :mask="['(##)  ####-####', '(##) # ####-####']"
      />
    </div>
    <InputUI placeholder="E-mail" type="email" />
    <div class="col-30-70">
      <InputUI placeholder="CEP" mask="#####-###" />
      <InputUI placeholder="Endereço" />
    </div>
    <div class="col-50">
      <InputUI placeholder="Cidade" />
      <InputUI placeholder="Estado" mask="AA" />
    </div>
  </div>
</template>

<style scoped>
.register__container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.col-50 {
  width: 100%;
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr;
}

.col-30-70 {
  width: 100%;
  display: grid;
  gap: 15px;
  grid-template-columns: 0.3fr 1fr;
}
</style>

<script setup lang="ts">
import { reactive, watch } from "vue";
import InputUI from "../ui/input/InputUI.vue";

export interface RegisterFormProps {
  title: string;
  modelValue: RegisterForm;
}

export interface RegisterForm {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  cep: string;
  address: string;
  city: string;
  uf: string;
}

const props = withDefaults(defineProps<RegisterFormProps>(), {
  title: "Finalizar Compra",
});

const emit = defineEmits(["update:modelValue"]);

const form = reactive<RegisterForm>({
  name: "",
  cpf: "",
  phone: "",
  email: "",
  cep: "",
  address: "",
  city: "",
  uf: "",
});

watch(
  () => form,
  (value) => {
    emit("update:modelValue", value);
  },
  { deep: true }
);
</script>

<template>
  <div class="register__container">
    <h2 class="register__header">{{ title }}</h2>

    <div class="register__inputs">
      <InputUI v-model="form.name" placeholder="Nome Completo" />
      <div class="col-50">
        <InputUI v-model="form.cpf" placeholder="CPF" mask="###.###.###-##" />
        <InputUI
          v-model="form.phone"
          :mask="['(##)  ####-####', '(##) # ####-####']"
          placeholder="Celular"
        />
      </div>
      <InputUI v-model="form.email" placeholder="E-mail" type="email" />
      <div class="col-30-70">
        <InputUI v-model="form.cep" placeholder="CEP" mask="#####-###" />
        <InputUI v-model="form.address" placeholder="Endereço" />
      </div>
      <div class="col-50">
        <InputUI v-model="form.city" placeholder="Cidade" />
        <InputUI v-model="form.uf" placeholder="Estado" mask="AA" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.register__container,
.register__inputs {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.register__header {
  font-size: 2.2rem;
  padding-bottom: 10px;
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

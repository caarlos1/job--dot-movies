<script setup lang="ts">
import { reactive, watch } from "vue";
import InputUI from "../ui/input/InputUI.vue";

export interface RegisterFormProps {
  title?: string;
  modelValue: RegisterFormData;
  alert?: string;
}

export interface RegisterFormData {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  cep: string;
  address: string;
  city: string;
  uf: string;
}

withDefaults(defineProps<RegisterFormProps>(), {
  title: "Finalizar Compra",
});

const emit = defineEmits(["update:modelValue"]);

const form = reactive<RegisterFormData>({
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
  <div class="form__container">
    <h2 v-if="title" class="form__header">{{ title }}</h2>

    <span v-if="alert" class="form__alert">{{ alert }}</span>

    <form class="form__inputs">
      <InputUI
        v-model="form.name"
        label="Nome Completo:"
        placeholder="Nome Completo"
        required
      />
      <div class="col-50">
        <InputUI
          v-model="form.cpf"
          label="CPF:"
          placeholder="CPF"
          mask="###.###.###-##"
          required
        />
        <InputUI
          v-model="form.phone"
          label="Celular:"
          :mask="['(##)  ####-####', '(##) # ####-####']"
          placeholder="Celular"
          required
        />
      </div>
      <InputUI
        v-model="form.email"
        label="Email:"
        placeholder="E-mail"
        type="email"
        required
      />
      <div class="col-30-70">
        <InputUI
          v-model="form.cep"
          label="CEP:"
          placeholder="CEP"
          mask="#####-###"
          required
        />
        <InputUI
          v-model="form.address"
          label="Endereço:"
          placeholder="Endereço"
          required
        />
      </div>
      <div class="col-50">
        <InputUI
          v-model="form.city"
          label="Cidade:"
          placeholder="Cidade"
          required
        />
        <InputUI
          v-model="form.uf"
          label="Estado:"
          placeholder="Estado"
          required
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.form__container,
.form__inputs {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.form__header {
  font-size: 2.2rem;
  line-height: 2.2rem;
  padding-bottom: 0px;
}

.form__alert {
  line-height: 2.6rem;
}

.col-50 {
  min-width: 100%;
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

@media (max-width: 400px) {
  .col-50,
  .col-30-70 {
    display: flex;
    flex-direction: column;
  }
}
</style>

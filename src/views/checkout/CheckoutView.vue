<script lang="ts" setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useToast } from "vue-toastification";

import RightSidebar from "../../templates/right-column/RightSidebar.vue";

import TheMenu, {
  type MenuProps,
} from "../../components/header/menu/TheMenu.vue";
import TheCart from "../../components/shop/cart/TheCart.vue";
import RegisterForm, {
  type RegisterFormData,
} from "../../components/form/RegisterForm.vue";
import DinamicCart from "../../templates/components/dinamic-cart/DinamicCart.vue";
import type { CartItem } from "@/components/shop/cart-list/CartList.vue";
import { useModal } from "@/hooks/useModal";
import type { ModalStateInterface } from "@/components/modal/modal-factory/ModalFactory.vue";
import type { GenericModalProps } from "@/components/modal/generic-modal/GenericModal.vue";

import {
  validateCep,
  validateCpf,
  validateEmail,
  validatePhone,
} from "../../util/validators";

const router = useRouter();
const cartStore = useCartStore();
const toast = useToast();
const modal = useModal();

const page = reactive({
  showSidebar: false,
});

const form = reactive<{ register: RegisterFormData }>({
  register: {} as RegisterFormData,
});

const alertForm = computed(() => {
  const { name, cpf, address, phone, email, cep, city, uf } = form.register;
  if (!name || !cpf || !phone || !email || !address || !cep || !city || !uf)
    return "Digite todos os campos do formulário.";
  else if (!validateCep(cep)) return "Digite um CEP válido";
  else if (!validateCpf(cpf)) return "Digite um documento de cpf válido";
  else if (!validatePhone(phone)) return "Informe um número de celular válido";
  else if (!validateEmail(email)) return "Informe um e-mail válido";
  return "";
});

const menu = reactive<MenuProps>({
  logo: {
    title: "Dot Movies",
    url: "home",
    logoImage: "",
    uppercase: true,
  },
});

const cart = reactive({
  title: "Carrinho",
  total: 0,
  header: true,
  big: true,
  addButton: true,
  items: [],
  confirmButton: "Finalizar",
});

const toogleSidebarFavorites = () => {
  page.showSidebar = !page.showSidebar;
};

const closeSidebar = () => {
  page.showSidebar = false;
};

const addItemToCart = (item: CartItem) => {
  cartStore.addToCart(item);
  toast(`Adicionado ao carrinho.`);
};

const deleteItemCart = (item: CartItem) => {
  cartStore.deleteToCart(item.id);
  toast(`${item.title} excluido do carrinho.`);
};

const clearCart = () => {
  cartStore.clear();
  toast("Seu carrinho agora está vazio!");
};

const submitPurchase = () => {
  modal.open<ModalStateInterface<GenericModalProps>>({
    name: "generic",
    props: {
      title: `Obrigado ${form.register.name}.`,
      body: "Sua compra foi finalizada com sucesso!",
      button: "Ir para Loja",
      buttonAction: () => toHome(),
      alignCenter: true,
    },
  });
};

const toHome = () => {
  modal.close();
  cartStore.clear();
  router.push({
    name: "home",
  });
};

const searchMovies = (search = "") => {
  router.push({
    name: "home",
    query: {
      search,
    },
  });
};
</script>

<template>
  <RightSidebar v-bind="page" @template:close-sidebar="closeSidebar">
    <template #header>
      <TheMenu
        v-bind="menu"
        :search-action="searchMovies"
        disable-cart
        @menu:open-favorite="toogleSidebarFavorites"
      />
    </template>
    <template #content>
      <div class="page__container">
        <div class="page__checkout">
          <div class="w100">
            <RegisterForm v-model="form.register" :alert="alertForm" />
          </div>

          <div class="w100">
            <TheCart
              v-bind="cart"
              :items="cartStore.getProducts"
              :total="cartStore.getTotal"
              :add-action="addItemToCart"
              :delete-action="deleteItemCart"
              :can-submit="!alertForm"
              scroll
              @cart:clear="clearCart"
              @cart:submit="submitPurchase"
            />
          </div>
        </div>
      </div>
    </template>
    <template #sidebar>
      <DinamicCart content="favorites" />
    </template>
  </RightSidebar>
</template>

<style scoped>
.page__checkout {
  display: flex;
  width: 100%;
  gap: 30px;
  max-width: 1200px;
  flex-direction: row;
}

.w100 {
  width: 100%;
}

@media (min-width: 1000px) {
  .page__container {
    height: 100%;
    flex: 1 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 1000px) {
  .page__checkout {
    flex-direction: column;
  }
}
</style>

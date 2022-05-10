<script setup lang="ts">
import { CartIcon, TrashIcon } from "../../icons";
import ImageBoxUI from "../../ui/image/ImageBoxUI.vue";

export interface CartListProps {
  header: boolean;
  big: boolean;
  items: CartItem[];
  addButton: boolean;
  disableQte?: boolean;
}

export interface CartItem {
  id: number;
  title: string;
  cover: string;
  price: number;
  num: number;
}

withDefaults(defineProps<CartListProps>(), {
  header: false,
  big: false,
  addButton: false,
  disableQte: false,
});

defineEmits(["cart:add", "cart:delete"]);

const formatedPrice = (price = 0) => `R$ ${price.toFixed(2).replace(".", ",")}`;
</script>

<template>
  <div class="cart-list__container">
    <table v-if="items.length" class="cart-list__table">
      <tr v-if="header" class="table__header">
        <th>Imagem</th>
        <th>Nome</th>
        <th v-if="!disableQte">Qtd.</th>
        <th>Preço</th>
      </tr>

      <tr v-for="item in items" :key="item.id">
        <td class="image-td" :class="{ 'image-td--big': big }">
          <ImageBoxUI :url="item.cover" :title="item.title" radius="5px" />
        </td>
        <td>{{ item.title }}</td>
        <td v-if="!disableQte" class="num-td">{{ item.num }}</td>
        <td class="price-td">{{ formatedPrice(item.price) }}</td>
        <td
          v-if="addButton"
          class="action-td cart-td"
          title="Adicionar no Carrinho"
        >
          <CartIcon @click="() => $emit('cart:add', item)" />
        </td>
        <td class="action-td" title="Remover Item">
          <TrashIcon @click="() => $emit('cart:delete', item)" />
        </td>
      </tr>
    </table>
    <span v-else class="product__empty"> Nenhum item encontrado. </span>
  </div>
</template>

<style scoped>
.cart-list__container {
  width: 100%;
  position: relative;
  display: flex;
  border-collapse: collapse;
}

.cart-list__table {
  width: 100%;
  vertical-align: middle;
}

.cart-list__table th,
.cart-list__table td {
  text-align: left;
  padding: 10px 0px 10px 15px;
  vertical-align: middle;
}

.cart-list__table th {
  font-weight: 500;
  padding-bottom: 10px;
  padding-top: 0;
}

.cart-list__table th:first-child {
  padding-top: 0;
  padding-left: 0;
}
.cart-list__table td:first-child {
  padding-left: 0;
}

.cart-list__table tr::after {
  transition: all 300ms ease;
  position: absolute;
  left: 50%;
  bottom: -1px;
  transform: translateX(-50%);
  content: " ";
  width: 80%;
  height: 2px;
  background-color: #c3cfd970;
}

.cart-list__table tr:hover::after {
  width: 95%;
}

.cart-list__table tr:last-child::after {
  display: none;
}

.cart-list__table .table__header:after {
  width: 100%;
}

.cart-list__table .table__header:hover::after {
  width: 80%;
}

.image-td {
  min-width: 30px;
}

.image-td--big {
  width: 70px;
}

.price-td {
  width: 90px;
}

.num-td {
  width: 35px;
}

.action-td {
  position: relative;
  width: 40px;
  min-width: 40px;
}
.action-td svg {
  cursor: pointer;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  transition: all 100ms ease;
  height: 1.8rem;
  fill: var(--color-text);
}

.action-td svg:hover {
  transform: scale(120%) translate(50%, -50%);
}

.action-td svg:active {
  transform: scale(110%) translate(50%, -50%);
}

.cart-td svg {
  fill: #1aae9f;
}

@media (max-width: 768px) {
  .cart-list__table td {
    font-size: 1.4rem;
    line-height: 1.4rem;
  }
}
</style>

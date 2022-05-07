<script setup lang="ts">
import { CartIcon, TrashIcon } from "../../icons";

export interface CartListProps {
  header: boolean;
  big: boolean;
  addButton: boolean;
  items: CartItem[];
}

export interface CartItem {
  id: number | string;
  title: string;
  cover: string;
  price: number;
  num: number;
}

withDefaults(defineProps<CartListProps>(), {
  header: false,
  big: false,
  addButton: false,
});

defineEmits(["cart:add", "cart:delete"]);

const formatedPrice = (price = 0) => `R$ ${price.toFixed(2).replace(".", ",")}`;
</script>

<template>
  <div class="cart-list__container">
    <table class="cart-list__table">
      <tr v-if="header" class="table__header">
        <th>Imagem</th>
        <th>Nome</th>
        <th>Qtd.</th>
        <th>Preço</th>
      </tr>
      <tr v-for="item in items" :key="item.id">
        <td class="image" :class="{ big: big }">
          <img :src="item.cover" alt="" />
        </td>
        <td>{{ item.title }}</td>
        <td>{{ item.num }}</td>
        <td>{{ formatedPrice(item.price) }}</td>
        <td v-if="addButton" class="action cart" title="Adicionar no Carrinho">
          <CartIcon @click="() => $emit('cart:add', item)" />
        </td>
        <td class="action delete" title="Remover Item">
          <TrashIcon @click="() => $emit('cart:delete', item)" />
        </td>
      </tr>
    </table>
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

.cart-list__table .table__header:after {
  width: 100%;
}

.cart-list__table .table__header:hover::after {
  width: 80%;
}

.image {
  width: 20px;
  min-width: 30px;
}

.image img {
  width: 100%;
}

.big {
  width: 80px;
}

.action {
  position: relative;
  width: 40px;
  min-width: 30px;
}
.action svg {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: all 100ms ease;
  height: 1.8rem;
  fill: var(--color-text);
}

.action svg:hover {
  transform: scale(120%) translateY(-50%);
}

.action svg:active {
  transform: scale(110%) translateY(-50%);
}

@media (max-width: 320px) {
  .cart-list__table td {
    text-align: center;
    font-size: 1.4rem;
    line-height: 1.4rem;
  }
}
</style>

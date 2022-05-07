import { cartList, items } from "../../cart-list/util/mock";

export const cart = {
  title: "Carrinho",
  ...cartList,
  items: [...items],
  total: 30.0,
  confirmButton: "Finalizar Compra",
};

import { createStore } from 'vuex';
import products from '@/data/products';

export default createStore({
  state: {
    cartProducts: [

    ],
  },
  mutations: {
    addProductToCart(state, { productID, amount, color }) {
      const item = state.cartProducts
        // eslint-disable-next-line max-len
        .find((searchingItem) => (searchingItem.productID === productID && searchingItem.color === color));

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productID,
          amount,
          color,
        });
      }
    },
    updateProductCartAmount(state, { productID, amount, color }) {
      const item = state.cartProducts
        // eslint-disable-next-line max-len
        .find((searchingItem) => (searchingItem.productID === productID && searchingItem.color === color));
      if (item) {
        item.amount = amount;
      }
    },
    deleteProductFromCart(state, { productID, color }) {
      const item = state.cartProducts
        // eslint-disable-next-line max-len
        .find((searchingItem) => (searchingItem.productID === productID && searchingItem.color === color));
      console.log(1);
      if (item) {
        state.cartProducts = state.cartProducts
          .filter((product) => product !== item);
      }
    },
    reduceProductAmount(state, { productID, color }) {
      const item = state.cartProducts
        // eslint-disable-next-line max-len
        .find((searchingItem) => (searchingItem.productID === productID && searchingItem.color === color));
      if (item && item.amount !== 1) {
        item.amount -= 1;
      }
    },
    increaseProductAmount(state, { productID, color }) {
      const item = state.cartProducts
        // eslint-disable-next-line max-len
        .find((searchingItem) => (searchingItem.productID === productID && searchingItem.color === color));
      if (item) {
        item.amount += 1;
      }
    },
  },
  getters: {
    CartDetailedProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.productID),
      }));
    },
    CartTotalPrice(state, getters) {
      return getters.CartDetailedProducts
        .reduce((value, item) => value + (item.product.price * item.amount), 0);
    },
    CartTotalAmount(state, getters) {
      return getters.CartDetailedProducts
        .reduce((value, item) => value + item.amount, 0);
    },
  },
  actions: {
  },
  modules: {
  },
});

import axios from 'axios';
import { createStore } from 'vuex';
import { API_BASE_URL } from '@/config';

export default createStore({
  state: {
    cartProducts: [

    ],
    cartAccessKey: null,
    cartProductsData: [],
    orderInfo: null,
  },
  mutations: {
    setOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateProductCartAmount(state, { productID, amount }) {
      const item = state.cartProducts
        // eslint-disable-next-line max-len
        .find((searchingItem) => (searchingItem.productID === productID));
      if (item) {
        item.amount = amount;
      }
    },
    deleteProductFromCart(state, { productID }) {
      console.log(productID);
      const item = state.cartProducts
        // eslint-disable-next-line max-len
        .find((searchingItem) => searchingItem.productID === productID);

      if (item) {
        state.cartProducts = state.cartProducts
          .filter((product) => product !== item);
      }
    },
    reduceProductAmount(state, { productID }) {
      const item = state.cartProducts
        // eslint-disable-next-line max-len
        .find((searchingItem) => searchingItem.productID === productID);
      if (item && item.amount !== 1) {
        item.amount -= 1;
      }
    },
    increaseProductAmount(state, { productID }) {
      const item = state.cartProducts
        // eslint-disable-next-line max-len
        .find((searchingItem) => searchingItem.productID === productID);
      if (item) {
        item.amount += 1;
      }
    },
    updateAccessKey(state, accessKey) {
      state.cartAccessKey = accessKey;
    },
    updateCartProductsData(state, productsData) {
      state.cartProductsData = productsData;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productID: item.product.id,
        amount: item.quantity,
      }));
    },
  },
  getters: {
    CartDetailedProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => item.productID === p.product.id);
        return {
          ...item,
          product: {
            ...product,
            img: product.image.file.url,
          },
        };
      });
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
    async loadCart(context) {
      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.cartAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.cartAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    async addProductToCart(context, { productID, amount }) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId: productID,
        quantity: amount,
      },
      {
        params: {
          userAccessKey: context.state.cartAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    async deleteCartProduct(context, { productID }) {
      context.commit('deleteProductFromCart', { productID });
      return axios.delete(`${API_BASE_URL}/api/baskets/products`,
        {
          params: {
            userAccessKey: context.state.cartAccessKey,
          },
          data: {
            productId: productID,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    async updateCartProductAmount(context, { productID, amount }) {
      context.commit('updateProductCartAmount', { productID, amount });
      if (amount < 1) {
        return;
      }
      // eslint-disable-next-line consistent-return
      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId: productID,
        quantity: amount,
      },
      {
        params: {
          userAccessKey: context.state.cartAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
  },

  modules: {
  },
});

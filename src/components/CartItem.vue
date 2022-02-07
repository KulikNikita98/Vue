<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.img"
        width="120"
        height="120"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code"> Артикул: {{ item.productID }} </span>

    <div class="product__counter form__counter">
      <button @click.prevent="decrementAmount(this.item.productID)"
       type="button" aria-label="Убрать один товар">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count" />

      <button @click.prevent="incrementAmount(this.item.productID)"
       type="button" aria-label="Добавить один товар">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ numberFormat(item.product.price * item.amount) }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      @click.prevent="deleteCartProduct(this.item.productID);"
      aria-label="Удалить товар из корзины"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapMutations } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['item'],
  data() {
    return {
      currentAmount: this.item.amount,
    };
  },
  methods: {
    numberFormat,
    ...mapMutations({
      deleteCartProduct: 'deleteProductFromCart',
      decrementAmount: 'reduceProductAmount',
      incrementAmount: 'increaseProductAmount',
    }),
  },
  watch: {
    'item.amount': function (value) {
      this.currentAmount = value;
    },
  },
  computed: {
    amount: {
      get() {
        return this.currentAmount;
      },
      set(value) {
        return this.$store.commit('updateProductCartAmount', { productID: this.item.productID, amount: value });
      },
    },
  },
};
</script>

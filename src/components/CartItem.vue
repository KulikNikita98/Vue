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

    <ProductCounter v-model:productId="productID" v-model:amount="amount"/>

    <b class="product__price">
      {{ numberFormat(item.product.price * item.amount) }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      @click.prevent="deleteCartProduct({productID: this.item.productID, color: this.item.color});"
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
import ProductCounter from '@/components/ProductCounter.vue';

export default {
  props: ['item'],
  data() {
    return {
      currentAmount: this.item.amount,
      currentItemId: this.item.productID,
    };
  },
  components: {
    ProductCounter,
  },
  methods: {
    numberFormat,
    ...mapMutations({
      deleteCartProduct: 'deleteProductFromCart',
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
        return this.$store.dispatch('updateCartProductAmount', { productID: this.item.productID, amount: value });
      },
    },
    productID: {
      get() {
        return this.currentAmount;
      },
    },
  },
};
</script>

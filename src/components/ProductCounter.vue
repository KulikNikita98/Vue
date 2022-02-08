<template>
    <div class="form__counter">
      <button @click.prevent="decrementProduct(currentProductAmount)"
      type="button" aria-label="Убрать один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="currentProductAmount" name="count">

    <button @click.prevent="incrementProduct(currentProductAmount)"
        type="button" aria-label="Добавить один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentAmount: this.amount,
    };
  },
  props: ['amount', 'productId'],
  watch: {
    amount(value) {
      this.currentAmount = value;
    },
  },
  methods: {
    incrementProduct(value) {
      this.currentProductAmount = value + 1;
    },
    decrementProduct(value) {
      if (value <= 1) {
        return;
      }
      this.currentProductAmount = value - 1;
    },
  },
  computed: {
    currentProductAmount: {
      get() {
        return this.amount;
      },
      set(value) {
        this.$emit('update:amount', value);
      },
    },
  },
};
</script>

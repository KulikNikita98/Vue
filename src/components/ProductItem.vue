<template>
   <li class="catalog__item">
            <router-link class="catalog__pic"
            :to="{name: 'product', params: {id: product.id, color: currentColor}}">
              <img :src="product.img"  :alt="product.title">
            </router-link>

            <h3 class="catalog__title">
              <a href="#">
               {{product.title}}
              </a>
            </h3>

            <span class="catalog__price">
              {{formattedNumber}} ₽
            </span>

            <ul class="colors colors--black">
              <li
              class="colors__item" v-for="color in product.colors" :key="color.id">
                <label class="colors__label">
                  <input class="colors__radio sr-only" v-model="currentColor" type="radio"
                   :value="color.code">
                  <span class="colors__value" :style="{['background-color']: color.code}">
                  </span>
                </label>
              </li>
            </ul>
          </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  data() {
    return {
      currentColor: this.product.colors[0].code,
    };
  },
  methods: {
    numberFormat,
  },
  computed: {
    formattedNumber() {
      return numberFormat(this.product.price);
    },
  },

};

</script>

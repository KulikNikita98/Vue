<template>
   <li class="catalog__item">
            <router-link class="catalog__pic"
            :to="{name: 'product', params: {id: product.id, color: currentColor}}">
              <img :src="product.img"  :alt="product.title">
            </router-link>

            <h3 class="catalog__title">
              <a href="#" @click.prevent="openQuickView(product.id)">
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
            <BaseModal v-model:isOpen="isQuickViewOpen">
            <ProductQuickView :productId="currentProductId"></ProductQuickView>
             </BaseModal>
</template>

<script>

import { defineAsyncComponent, h } from 'vue';
import numberFormat from '@/helpers/numberFormat';
import BaseModal from '@/components/BaseModal.vue';

export default {
  props: ['product'],
  components: {
    BaseModal,
    ProductQuickView: defineAsyncComponent({
      loader: () => import('@/components/ProductQuickView.vue'),
      delay: 0,
      loadingComponent: () => h('div', 'Загрузка товаров...'),
    }),
  },
  data() {
    return {
      currentColor: this.product.colors[0].code,
      currentProductId: null,
    };
  },
  methods: {
    numberFormat,
    openQuickView(id) {
      this.currentProductId = id;
    },
    closeQuickView() {
      this.isQuickViewOpen = false;
    },
  },
  computed: {
    isQuickViewOpen: {
      get() {
        return !!this.currentProductId;
      },
      set(isOpen) {
        if (!isOpen) {
          this.currentProductId = null;
        }
      },

    },
    formattedNumber() {
      return numberFormat(this.product.price);
    },
  },

};

</script>

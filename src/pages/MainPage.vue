<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-model:category="filterCategoryId"
        v-model:priceFrom="filterPriceFrom"
        v-model:priceTo="filterPriceTo"
        v-model:currentColor="color"
      />
      <section class="catalog">
        <div v-if="isProductsLoading">Подождите, идет загрузка товаров...</div>
        <div v-if="isProductsLoadingFailed">Произошла ошибка при загрузке товаров :(
          <button @click.prevent="loadProducts()">Попробовать еще раз</button>
        </div>
        <ProductList  :products="products" />
        <AppPagination
          v-model:page="page"
          :perPage="productsPerPage"
          :count="count"
        />
      </section>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import ProductList from '@/components/ProductList.vue';
import AppPagination from '@/components/AppPagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
  components: {
    ProductList,
    AppPagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      color: '#73B6EA',
      page: 1,
      productsPerPage: 3,
      productsData: null,
      isProductsLoading: false,
      isProductsLoadingFailed: false,
    };
  },

  computed: {

    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          img: product.image.file.url,
        }))
        : [];
    },
    count() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    async loadProducts() {
      clearTimeout(this.loadingProductsTimer);
      this.isProductsLoading = true;
      this.isProductsLoadingFailed = false;
      this.loadingProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          // eslint-disable-next-line no-return-assign
          .then((response) => (this.productsData = response.data))
          // eslint-disable-next-line no-return-assign
          .catch(() => this.isProductsLoadingFailed = true)
          // eslint-disable-next-line no-return-assign
          .then(() => this.isProductsLoading = false);
      }, 5000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts(this.page, this.productsPerPage);
  },
};
</script>

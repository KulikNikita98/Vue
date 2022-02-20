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
        :colors="colors"
        v-model:colorId="filterColorId"
      />
      <section class="catalog">
        <div v-if="isProductsLoading">Подождите, идет загрузка товаров...</div>
        <div v-if="isProductsLoadingFailed">Произошла ошибка при загрузке товаров :(
          <button  @click.prevent="loadProducts()">Попробовать еще раз</button>
        </div>
        <ProductList v-if="isProductsLoaded"  :products="products" />
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
      filterColorId: null,
      page: 1,
      productsPerPage: 3,
      colorsData: null,
      productsData: null,
      isProductsLoading: false,
      isProductsLoadingFailed: false,
      isProductsLoaded: false,
    };
  },

  computed: {
    colors() {
      return this.colorsData ? this.colorsData
        .filter((color) => color.id <= this.colorsData.length) : [];
    },
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
    async loadColors() {
      clearTimeout(this.colorLoadTimer);
      this.colorLoadTimer = setTimeout(
        () => {
          axios.get(`${API_BASE_URL}/api/colors`)
          // eslint-disable-next-line no-return-assign
            .then((response) => this.colorsData = response.data.items);
        }, 0,
      );
    },
    async loadProducts() {
      clearTimeout(this.loadingProductsTimer);
      this.isProductsLoading = true;
      this.isProductsLoadingFailed = false;
      this.isProductsLoaded = false;
      this.loadingProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColorId,
            },
          })
          // eslint-disable-next-line no-return-assign
          .then((response) => (this.productsData = response.data))
          // eslint-disable-next-line no-return-assign
          .catch(() => this.isProductsLoadingFailed = true)
          // eslint-disable-next-line no-return-assign
          .then(() => {
            this.isProductsLoading = false;
            this.isProductsLoaded = true;
          });
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
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts(this.page, this.productsPerPage);
    this.loadColors();
  },
};
</script>

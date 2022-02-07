<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter v-model:category="filterCategoryId" v-model:priceFrom="filterPriceFrom"
      v-model:priceTo="filterPriceTo" v-model:currentColor="color" />
      <section class="catalog">
        <ProductList :products="products"
         />
        <AppPagination v-model:page="page" :perPage="productsPerPage"
        :count="count" />
      </section>

    </div>
  </main>
</template>

<script>
import products from '@/data/products';
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
    };
  },

  computed: {
    filteredProducts() {
      let filteredProducts = products;
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts
          .filter((product) => product.categoryID === this.filterCategoryId);
      }
      if (this.color) {
        filteredProducts = filteredProducts
          .filter((product) => product.colors.find((color) => color === this.color));
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts
        .slice(offset, offset + this.productsPerPage);
    },
    count() {
      return this.filteredProducts.length;
    },
  },
};
</script>

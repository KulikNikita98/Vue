<template>
    <main class="content container"
    v-if="status.isProductLoading">Подождите, идет загрузка товара...</main>
    <main class="content container"
    v-else-if="status.isLoadingFailed">Не удалось загрузить товар</main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{product.category.title}}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
             {{product.title}}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.img"
          :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">
          {{product.title}}
        </h2>
        <div class="item__form">
          <form class="form" @submit.prevent="doAddToCart()" action="#" method="POST">
            <b class="item__price">
              {{ product.formattedNumber }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in product.colors" :key="color.id">
                  <label class="colors__label">
                    <input v-model="currentColor" class="colors__radio sr-only"
                    type="radio" name="color-item"
                    :value="color.code" :checked="currentColor === color.code">
                    <span class="colors__value" :style="{'background-color': color.code}">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">

                <ProductCounter v-model:productId="product.id" v-model:amount="productAmount"/>

              <button class="button button--primery"  type="submit">
                В корзину
              </button>

            </div>
            <BaseModal v-model:isOpen="isProductAdded">
            Товар успешно добавлен в корзину </BaseModal>
              <div v-show="isProductAdded">Товар успешно добавлен в корзину</div>
              <div v-show="isProductAdding">Отправка товара в корзину</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
             велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
              синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.
               Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом
                на мобильное устройство можно установить как фирменное приложение,
                так и различные приложения сторонних разработчиков. Велокомпьютер
                точно отслеживает местоположение, принимая сигнал с целого комплекса
                спутников. Эта информация позволяет смотреть уже преодоленные маршруты
                и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют
            всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета
            выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей
             диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная
             со смартфона и синхронизированных датчиков информация: интенсивность, скорость
             вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус
             велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство
             не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение
             в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>

</template>

<script>

import {
  defineComponent,
  ref,
} from 'vue';
import {
  // onBeforeRouteUpdate,
  useRoute,
} from 'vue-router';
import {
  // mapActions,
  useStore,
} from 'vuex';

import BaseModal from '@/components/BaseModal.vue';
import ProductCounter from '@/components/ProductCounter.vue';
import useProduct from '@/hooks/useProduct';

export default defineComponent({
  components: {
    ProductCounter,
    BaseModal,
  },
  setup() {
    const $store = useStore();
    const $route = useRoute();
    const {
      product,
      color,
      fetchProduct,
      status,
    } = useProduct();

    const productAmount = ref(1);
    const isProductAdded = ref(false);
    const isProductAdding = ref(false);

    const doAddToCart = () => {
      isProductAdded.value = false;
      isProductAdding.value = true;
      if (productAmount.value < 1) {
        return;
      }
      $store.dispatch('addProductToCart',
        { productID: product.value.id, amount: productAmount.value })
        .then(() => {
          isProductAdded.value = true;
          isProductAdding.value = false;
        });
    };

    fetchProduct($route.params.id);

    return {
      doAddToCart,
      productAmount,
      currentColor: color,
      isProductAdded,
      isProductAdding,
      product,
      status,
    };
  },
});

// export default {
//   data() {
//     return {
//       productAmount: 1,
//       currentColor: this.$route.params.color,
//       productsData: null,
//       isLoadingFailed: false,
//       isProductLoading: false,
//       isProductAdded: false,
//       isProductAdding: false,
//     };
//   },
//   components: {
//     ProductCounter,
//     BaseModal,
//   },

//   computed: {
//     product() {
//       return this.productsData ? {
//         ...this.productsData,
//         img: this.productsData.image.file.url,
//       } : {};
//     },
//     formattedNumber() {
//       return doNumberFormat(this.product.price);
//     },
//   },
//   methods: {
//     ...mapActions(['addProductToCart']),
//     doNumberFormat,
//     addToCart() {
//       this.isProductAdded = false;
//       this.isProductAdding = true;
//       if (this.productAmount < 1) {
//         return;
//       }
//       this.addProductToCart(
//         { productID: this.product.id, amount: this.productAmount },
//       )
//         .then(() => {
//           this.isProductAdded = true;
//           this.isProductAdding = false;
//         });
//     },
//     loadProduct() {
//       this.isLoadingFailed = false;
//       this.isProductLoading = true;
//       axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
//         // eslint-disable-next-line no-return-assign
//         .then((response) => this.productsData = response.data)
//         // eslint-disable-next-line no-return-assign
//         .catch(() => this.isLoadingFailed = true)
//         // eslint-disable-next-line no-return-assign
//         .then(() => this.isProductLoading = false);
//     },
//   },
//   created() {
//     this.loadProduct();
//   },
//   beforeRouteUpdate() {
//     this.loadProduct();
//   },

// };
</script>

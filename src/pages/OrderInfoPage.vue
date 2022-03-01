<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'main' }" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'cart' }" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Заказ оформлен
        <span>№ {{ customerData.id }}</span></h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <OrderFormField :data="customerData.name" title="Получатель" />
            <OrderFormField :data="customerData.address" title="Адрес доставки"/>
            <OrderFormField :data="customerData.phone" title="Телефон"/>
            <OrderFormField :data="customerData.email" title="Email"/>
            <OrderFormField data="картой при получении" title="Способ оплаты"/>
          </ul>
        </div>

        <div class="cart__block">
          <ul v-for="item in orderItems" :key="item.product.id" class="cart__orders">
            <OrderProduct :id="item.product.id" :price="numberFormat(item.product.price)"
            :title="item.product.title" />
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{totalOrderAmount}}</b> товара на сумму <b>
              {{numberFormat(totalOrderPrice)}} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { API_BASE_URL } from '@/config';
import numberFormat from '@/helpers/numberFormat';
import OrderFormField from '@/components/OrderFormField.vue';
import OrderProduct from '@/components/OrderProduct.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    OrderFormField,
    OrderProduct,
  },
  methods: {
    numberFormat,
    loadOrdersData() {
      axios
        .get(`${API_BASE_URL}/api/orders/${this.$route.params.id}`, {
          params: {
            userAccessKey: this.$store.state.cartAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('setOrderInfo', response.data);
        });
    },
  },
  computed: {
    ...mapGetters(['orderItems', 'customerData', 'totalOrderAmount', 'totalOrderPrice']),
  },
  watch: {
    '$route.params.id': {
      handler() {
        if (this.$store.state.orderInfo
        && this.$store.state.orderInfo.id === this.$route.params.id) {
          return;
        }
        this.loadOrdersData();
      },
      immediate: true,
    },
  },
};
</script>

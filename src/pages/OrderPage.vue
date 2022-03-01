<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{totalAmount}} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="sendOrder">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText title="ФИО" name="name" type="text" :error="formError.name"
            placeholder="Введите ваше полное имя" v-model:value="formData.name"/>

            <BaseFormText title="Адрес доставки" name="address" type="text"
            :error="formError.address"
            placeholder="Введите ваш адрес" v-model:value="formData.address"/>

            <BaseFormText title="Телефон" name="phone" type="tel" :error="formError.phone"
            placeholder="Введите ваш телефон" v-model:value="formData.phone"/>

            <BaseFormText title="Email" name="email" type="email" :error="formError.email"
            placeholder="Введи ваш Email" v-model:value="formData.email"/>

            <BaseFormTextarea title="Комментарий к заказу" name="comment"
            :error="formError.comment"
            placeholder="Ваши пожелания" v-model:value="formData.comment"/>

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" v-model="formData.delivery" type="radio"
                   name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" v-model="formData.delivery"
                  type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" v-model="formData.pay"
                  type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" v-model="formData.pay"
                  type="radio" name="pay" checked value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li v-for="item in products" :key="item.productID" class="cart__order">
              <h3>{{item.product.title}}</h3>
              <b>{{numberFormat(item.product.price)}} ₽</b>
              <span>Артикул: {{item.productID}}</span>
            </li>

          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{formData.delivery}} ₽</b></p>
            <p>Итого: <b>{{ numberFormat(totalAmount) }}</b>
            товара на сумму <b> {{numberFormat(totalPrice) }} ₽</b></p>
          </div>

          <button
          class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
        <div v-if="isDataSending">Заявка отправляется. Подождите немного...</div>
      </form>
    </section>
  </main>
</template>

<script>

import axios from 'axios';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      formData: {
        delivery: 500,
        pay: 'cash',
      },
      formError: { },
      formErrorMessage: '',
      isDataSending: false,
    };
  },
  components: {
    BaseFormText,
    BaseFormTextarea,
  },
  computed: {
    ...mapGetters({
      products: 'CartDetailedProducts',
      totalAmount: 'CartTotalAmount',
      totalPrice: 'CartTotalPrice',
    }),
  },
  methods: {
    numberFormat,
    sendOrder() {
      this.formError = {};
      this.formErrorMessage = '';
      this.isDataSending = true;
      axios.post(`${API_BASE_URL}/api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.cartAccessKey,
        },
      })
        .then((response) => {
          this.$store.commit('resetCart');
          this.formData = {};
          this.$store.commit('setOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error;
        })
        .then(() => {
          this.isDataSending = false;
        });
    },
  },

};
</script>

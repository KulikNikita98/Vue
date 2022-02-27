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
      <form class="cart__form form" action="#" method="POST">
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

            <BaseFormTextarea title="Комментарий к заказу" name="comments"
            :error="formError.comments"
            placeholder="Ваши пожелания" v-model:value="formData.comments"/>

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                   name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
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
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
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
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ numberFormat(totalAmount) }}</b>
            товара на сумму <b> {{numberFormat(totalPrice) }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';

export default {
  data() {
    return {
      formData: { },
      formError: { },
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
    ...mapActions({
      loadCartProducts: 'loadCart',
    }),
    numberFormat,
  },
  created() {
    this.loadCartProducts();
  },
};
</script>

<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      @submit.prevent="submit()"
      class="filter__form form"
      action="#"
      method="get"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            v-model.number="currentPriceTo"
            name="max-price"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            v-model.number="currentCategory"
            class="form__select"
            type="text"
            name="category"
          >
            <option value="0">Все категории</option>
            <option
              v-for="category in categories"
              :value="category.id"
              :key="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#73B6EA"
                v-model="currentColor"
              />
              <span class="colors__value" style="background-color: #73b6ea">
              </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#FFBE15"
                v-model="currentColor"
              />
              <span class="colors__value" style="background-color: #ffbe15">
              </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#939393"
                v-model="currentColor" />
              <span class="colors__value" style="background-color: #939393">
              </span
            ></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#8BE000"
                v-model="currentColor" />
              <span class="colors__value" style="background-color: #8be000">
              </span
            ></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#FF6B00"
                v-model="currentColor" />
              <span class="colors__value" style="background-color: #ff6b00">
              </span
            ></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#FFF"
                v-model="currentColor" />
              <span class="colors__value" style="background-color: #fff"> </span
            ></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                value="#222"
                v-model="currentColor" />
              <span class="colors__value" style="background-color: #000"> </span
            ></label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="8"
                checked=""
              />
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="16"
              />
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="32"
              />
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="64"
              />
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="128"
              />
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="264"
              />
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        @click.prevent="reset()"
        class="filter__reset button button--second"
        type="button"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  props: ['category', 'priceFrom', 'priceTo'],
  data() {
    return {
      currentCategory: 0,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentColor: '#73B6EA',
      categoriesData: null,
    };
  },
  watch: {
    category(value) {
      this.currentCategory = value;
    },
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    currentColor(value) {
      this.currentColor = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:category', this.currentCategory);
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:currentColor', this.currentColor);
    },
    reset() {
      this.$emit('update:category', 0);
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:currentColor', '#73B6EA');
    },
    async loadCategory() {
      clearTimeout(this.ProductLoadTimer);

      this.ProductLoadTimer = setTimeout(
        () => {
          axios.get(`${API_BASE_URL}/api/productCategories`)
          // eslint-disable-next-line no-return-assign
            .then((response) => this.categoriesData = response.data);
        }, 0,
      );
    },
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
  },
  created() {
    this.loadCategory();
  },

};
</script>

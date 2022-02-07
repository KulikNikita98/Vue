<template>
          <ul class="catalog__pagination pagination">
          <li class="pagination__item">
            <a @click.prevent="paginatePrev()" class="pagination__link pagination__link--arrow"
            :class ="{'pagination__link--disabled': page === 1 }"
             aria-label="Предыдущая страница">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </a>
          </li>
          <li class="pagination__item " v-for="number in pages" :key="number">
            <a @click.prevent="paginate(number)" class="pagination__link" href="#!"
            :class="{'pagination__link--current': page === number}">
              {{number}}
            </a>
          </li>
          <li class="pagination__item">
            <a @click.prevent="paginateNext()" class="pagination__link pagination__link--arrow"
            href="#" :class ="{'pagination__link--disabled': page === pages }"
             aria-label="Следующая страница">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
        </ul>
</template>

<script>

export default {
  props: ['page', 'perPage', 'count'],
  methods: {
    paginate(value) {
      this.$emit('update:page', value);
    },
    paginatePrev() {
      if (this.page === 1) {
        return;
      }
      this.$emit('update:page', this.page - 1);
    },
    paginateNext() {
      if (this.page === this.pages) {
        return;
      }
      this.$emit('update:page', this.page + 1);
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
};
</script>

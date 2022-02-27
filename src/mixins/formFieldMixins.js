import BaseFormField from '@/components/BaseFormField.vue';

export default {
  props: ['title', 'error', 'name', 'placeholder', 'value'],
  components: {
    BaseFormField,
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('update:value', value);
      },
    },
  },
};

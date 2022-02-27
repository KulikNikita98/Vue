<template>
    <BaseFormField :title="title" :error="error" >
    <textarea class="form__input form__input--area" :type="type" :name="name" v-model="dataValue"
    :placeholder="placeholder"></textarea> </BaseFormField>
</template>

<script>

import formFieldMixins from '@/mixins/formFieldMixins';

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [
    formFieldMixins,
  ],
};

</script>

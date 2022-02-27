<template>
    <BaseFormField :title="title" :error="error" > <input :type="type" class="form__input"
      v-model="dataValue" :name="name"
    :placeholder="placeholder"> </BaseFormField>
</template>

<script>
import formFieldMixins from '@/mixins/formFieldMixins';

export default {
  props: ['type'],
  mixins: [
    formFieldMixins,
  ],
};
</script>

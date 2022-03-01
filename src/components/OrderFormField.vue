<template>
  <li class="dictionary__item">
    <OrderDormFieldData>
      <template v-slot:top>
    <span class="dictionary__key"  >{{title}} </span>
    </template>
    <template v-slot:bottom>
    <span class="dictionary__value" > {{data}}</span>
    </template>
    </OrderDormFieldData>
  </li>
</template>

<script>
import OrderDormFieldData from '@/components/OrderFormFieldData.vue';

export default {
  components: {
    OrderDormFieldData,
  },
  props: ['data', 'title'],
};
</script>

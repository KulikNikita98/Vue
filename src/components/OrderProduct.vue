<template>
    <li class="cart__order">
    <h3>{{title}}</h3>
    <b>{{price}} ₽</b>
    <span>Артикул: {{id}}</span>
  </li>
</template>

<script>
export default {
  props: ['title', 'id', 'price'],
};
</script>

import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProductCart from '@/pages/ProductCart.vue';

const routes = [

  {
    name: 'main',
    component: MainPage,
    path: '/',
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id',
  },
  {
    name: 'cart',
    component: ProductCart,
    path: '/cart',
  },

  {
    name: 'notFound',
    component: NotFoundPage,
    path: '/:catchAll(.*)',
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

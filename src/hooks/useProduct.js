import { useRoute } from 'vue-router';
import { ref, reactive } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import doNumberFormat from '@/helpers/numberFormat';

export default function () {
  const $route = useRoute();

  const color = ref($route.params.color);
  const productsData = ref(null);

  const fetchStatus = reactive({
    isLoadingFailed: false,
    isLoading: false,
  });

  const fetchProduct = (productId) => {
    fetchStatus.isLoadingFailed = false;
    fetchStatus.isLoading = true;
    axios.get(`${API_BASE_URL}/api/products/${productId}`)
      // eslint-disable-next-line no-return-assign
      .then((response) => {
        const product = response.data;
        productsData.value = {
          ...product,
          img: product.image.file.url,
          formattedNumber: doNumberFormat(product.price),
        };
      })
      // eslint-disable-next-line no-return-assign
      .catch(() => fetchStatus.isLoadingFailed = true)
      // eslint-disable-next-line no-return-assign
      .then(() => fetchStatus.isLoading = false);
  };
  return {
    product: productsData,
    color,
    status: fetchStatus,
    fetchProduct,
  };
}

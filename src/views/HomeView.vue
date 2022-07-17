<script setup>
import { onMounted } from "vue";
import ProductItem from "@/components/product/ProductItem.vue";
import { useApi } from "@/composables/api";
import { getProductList } from "@/services/product";

const productList = useApi(
  () => getProductList(),
  (r) => r.json()
);
onMounted(() => {
  productList.execute();
});
</script>

<template>
  <div v-if="productList.error.value">error</div>
  <div
    v-else-if="productList.result.value"
    class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
  >
    <ProductItem
      v-for="(product, index) in productList.result.value.data"
      :key="index"
      :item="product"
    />
  </div>
  <div v-else class="text-center">Loading...</div>
</template>

import { ref } from "vue";

export function useApi(factory, handleResponse) {
  const isLoading = ref(false);
  const result = ref(null);
  const error = ref(null);
  const execute = async (...args) => {
    const request = factory(...args);

    isLoading.value = true;
    error.value = null;
    try {
      console.log('try')
      const response = await fetch(request);
      const valueResponse = await handleResponse(response);

      result.value = valueResponse;
      return valueResponse;
    } catch (e) {
      console.log('error')
      result.value = {
        data: [
          {
            id: "74aae9d2-e871-4fe6-9414-a5658978af8b",
            name: "T-shirt",
            price: 10,
            imageUrl:
              "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/441598/item/goods_57_441598.jpg?width=1008&impolicy=quality_75",
          },
        ],
      };
      error.value = null;
      // error.value = e;
      // result.value = null;
    } finally {
      console.log('finally')
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    result,
    error,
    execute,
  };
}

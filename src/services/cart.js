import { BASE_URL } from "@/config/api";

export function addProductToCart({ cartId, productId }) {
  return {
    url: BASE_URL + "/cart/add",
    method: "POST",
    body: JSON.stringify({ cartId, productId }),
  };
}

export function getCartSummary({ cartId }) {
  return {
    url: BASE_URL + `/cart/summary?=${cartId}`,
    method: "GET",
  }
}

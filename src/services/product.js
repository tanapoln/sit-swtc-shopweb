import { BASE_URL } from "@/config/api";

export function getProductList() {
  return { url: BASE_URL + "/products", method: "GET" };
}

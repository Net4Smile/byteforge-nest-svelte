import type { PageServerLoad } from "./$types"
import { getProducts } from "$lib/handlers/gql/products";

export const load: PageServerLoad = async (event) => {
  const products = getProducts(event.fetch);

  return {
    products
  }
}
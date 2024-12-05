import type { PageServerLoad } from "./$types"
import { getProduct } from "$lib/handlers/gql/products";

export const load: PageServerLoad = async (event) => {
  const product = getProduct(event.params.id, event.fetch);

  return {
    product
  }
}
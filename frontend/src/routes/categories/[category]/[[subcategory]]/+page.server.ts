import type { PageServerLoad } from "./$types"
import { getProducts } from "$lib/handlers/gql/products";

export const load: PageServerLoad = async (event) => {
  const categoryName = event.params.subcategory ? event.params.subcategory : event.params.category;
  const products = getProducts(event.fetch, { categoryName });

  return {
    category: event.params.category,
    subcategory: event.params.subcategory,
    products
  }
}
import type { LayoutServerLoad } from "./$types"
import { getCategories } from "$lib/handlers/gql/categories";

export const load: LayoutServerLoad = async (event) => {
  const categories = await getCategories(event.fetch)

  return {
    categories
  }
}
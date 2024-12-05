import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async (event) => {

  return {
    category: event.params.category,
    subcategory: event.params.subcategory,
  }
}
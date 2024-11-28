import Category from "./template.svelte";

export type NavCategoryProps = {
  id: number | string;
  category: string;
  subcategories: string[];
};

export default Category
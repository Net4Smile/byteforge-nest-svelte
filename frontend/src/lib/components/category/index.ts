import type { Subcategory, Category } from "../../../generated/graphql";
import CategoryComponent from "./template.svelte";

export type NavCategoryProps = {
  id: number | string;
  category: Category;
  subcategories: Subcategory[];
};

export default CategoryComponent
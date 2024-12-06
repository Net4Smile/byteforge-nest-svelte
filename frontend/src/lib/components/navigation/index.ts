import type { Category } from "../../../generated/graphql";
import Navigation from "./template.svelte";

export type NavigationProps = {
  categories: Category[]
}

export default Navigation
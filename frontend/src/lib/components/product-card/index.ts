import type { Product } from "../../../generated/graphql";
import Card from "./template.svelte";

export type CardProps = {
  productId: Product["id"];
  productName: Product["name"];
  productPrice: Product["price"];
  productDesc: Product["description"];
  productImg: Product["image"][0]
  buttonText?: string;
};

export default Card
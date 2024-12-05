import Card from "./template.svelte"

export type CardProps = {
  productId: string;
  productName: string;
  productPrice: string;
  productDesc: string;
  productImg: {
    src: string;
    alt?: string;
  };
  buttonText?: string;
};

export default Card
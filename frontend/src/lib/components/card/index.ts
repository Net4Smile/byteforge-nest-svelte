import Card from "./template.svelte"

export type CardProps = {
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
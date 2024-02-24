
import { Metadata } from "next";
import SingleProductPage from "../screens/SingleProductPage";
type Props = {
  params: {
    productSlug: string;
  };
};
export const metadata: Metadata = {
  title: 'Product'

};

const Product = ({ params: { productSlug } }: Props) => {
 
   return  <SingleProductPage {...{productSlug}}/>
};

export default Product;

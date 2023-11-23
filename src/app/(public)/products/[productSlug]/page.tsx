
import SingleProductPage from "../screens/SingleProductPage";
type Props = {
  params: {
    productSlug: string;
  };
};
const Product = ({ params: { productSlug } }: Props) => {
 
   return  <SingleProductPage {...{productSlug}}/>
};

export default Product;

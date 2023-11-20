import { IProduct } from "@/types";

interface Props {
  product: IProduct;
  selectedVariation: any;
}
const QuickViewShortDetails = ({ product, selectedVariation }: Props) => {
  const stock = selectedVariation
    ? selectedVariation.quantity > 0
      ? "In Stock"
      : "Out of Stock"
    : (product?.quantity as number) > 0
    ? "In Stock"
    : "Out of Stock";
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg flex flex-col gap-1 text-gray-600 dark:text-white w-full md:w-[70%]">
      <li> SKU : {selectedVariation ? selectedVariation.sku : product?.sku}</li>
      <li> Stock Status: {stock}</li>
      <li> Quantity : {selectedVariation ? selectedVariation.quantity : product?.quantity} Items left</li>
    </div>
  );
};

export default QuickViewShortDetails;

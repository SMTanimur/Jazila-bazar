import usePrice from "@/hooks/use-price";
import { useGlobalModalStateStore } from "@/store/modal";
import { IProduct } from "@/types";
import { calculateDiscountPercentage } from "@/utils/util";
import { EyeIcon, HeartIcon, RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface Props {
  product: IProduct;
}
const ProductCard = ({ product }: Props) => {
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: "USD",
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: "USD",
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: "USD",
  });
  const globalModal = useGlobalModalStateStore((state) => state);
  return (
    <div className=" flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full">
      <Card className="bg-gray-200 shadow-sm rounded-md w-full h-full group flex flex-col px-4 py-5 cursor-pointer relative">
        <div className="w-full min-h-[150px] flex items-center relative justify-center overflow-hidden px-4">
          <Image
            className="object-center group-hover:scale-110 transition-all duration-700 "
            src={product.image?.img_url as string}
            alt={product.name}
            width={150}
            height={100}
          />
          <div className="absolute -bottom-12 bg-white rounded-md group-hover:bottom-5 transition-all duration-500 py-3 px-4 flex items-center space-x-2">
            <button
              onClick={() => globalModal.setQuickViewState(true, product)}
            >
              <EyeIcon className="w-5 h-5" />
              <span className="sr-only">Quick View</span>
            </button>
            <span className="border-l-2 h-full" />
            <button>
              <RefreshCwIcon className="w-5 h-5" />
              <span className="sr-only">Compare</span>
            </button>
            <div className="border border-l-2 h-full"></div>

            <button>
              <HeartIcon className="w-5 h-5" />
              <span className="sr-only">Wishlish</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <h5 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
            {product.name.length > 15
              ? `${product.name.substring(0, 15)}...`
              : product.name}
          </h5>
          {product.unit ? (
            <p className="text-sm text-gray-600">{product.unit}</p>
          ) : (
            <p className="text-sm text-gray-600">1(items)</p>
          )}
          <div className="flex gap-3 items-center">
            <p className="text-primary font-medium">
              {product.product_type === "variable"
                ? `${minPrice} - ${maxPrice}`
                : price}
            </p>
            {basePrice && (
              <del className="mx-1 text-sm text-gray-600 text-opacity-70">
                {basePrice}
              </del>
            )}
          </div>
        </div>

        <Button variant={"outline"} className="mt-4 rounded-full">
          Add to Cart
        </Button>
        {product.price ? (
          <div className="bg-primary p-1 absolute top-3 right-3 rounded-lg">
            <p className="text-xs text-white">
              {calculateDiscountPercentage({
                originalPrice: product.price,
                salePrice: product.sale_price,
              })}{" "}
              %
            </p>
          </div>
        ) : null}
  
      </Card>
    </div>
  );
};

export default ProductCard;

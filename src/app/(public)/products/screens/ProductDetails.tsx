"use client"
import { Button } from "@/components/ui/button";
import Counter from "@/components/ui/counter";
import { Icons } from "@/components/ui/icons";
import { ProgressBar } from "@/components/ui/progress";
import StarIcon from "@/components/ui/star-icon";
import usePrice from "@/hooks/use-price";
import { cn } from "@/lib/utils";
import ProductAttributes from "@/modules/products/product-attributes";
import QuickViewShortDetails from "@/modules/products/quickView/quick-view-short-details";
import ThumbnailCarousel from "@/modules/products/thumbnail-carousel";
import VariationPrice from "@/modules/products/variation-price";
import { useCartStore } from "@/store/cart/cart.store";
import { IProduct } from "@/types";
import { generateCartItem } from "@/utils/generate-cart-item";
import { getVariations } from "@/utils/get-variations";
import { isEmpty, isEqual } from "lodash";
import { HeartIcon, RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  product: IProduct;
};
const ProductDetails = ({ product }: Props) => {
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const { addItemToCart, isInCart, getItemFromCart } = useCartStore(
    (state) => state
  );
  const variations = getVariations(product?.variations);
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: "USD",
  });

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;

  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes)
      )
    );
  }

  const item = generateCartItem(product, selectedVariation);
  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    const item = generateCartItem(product, selectedVariation);
    addItemToCart(item, selectedQuantity);
    // @ts-ignore
    toast.success("Product added to cart");
  }
  return (
    <div className="mt-4 flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-1/2 product-gallery ">
        {!!product?.gallery?.length ? (
          <ThumbnailCarousel gallery={product?.gallery} isSingleProductPage />
        ) : (
          <div className="flex items-center justify-center w-auto">
            <Image
              src={product?.image?.img_url as string}
              alt={product?.name}
              width={450}
              height={390}
            />
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 flex flex-col  space-y-4 relative ">
        <div className="flex flex-col space-y-3 justify-center">
          <div className="flex flex-col gap-2 md:justify-center ">
            <h2 className="text-xl font-medium text-gray-800 dark:text-white">
              {product?.name}
            </h2>
            {product?.unit && isEmpty(variations) ? (
              <div className="text-sm font-medium md:text-15px hidden md:block">
                {product?.unit}
              </div>
            ) : (
              <VariationPrice
                selectedVariation={selectedVariation}
                minPrice={product?.min_price}
                maxPrice={product?.max_price}
              />
            )}
            {isEmpty(variations) && (
              <div className="flex flex-col items-start md:flex-row  md:justify-between ">
                <div className="flex items-center ">
                  <div className="text-primary font-bold text-base md:text-xl xl:text-[22px]">
                    {price}
                  </div>
                  {discount && (
                    <>
                      <del className="text-sm text-opacity-50 md:text-15px pl-3  text-gray-500 ">
                        {basePrice}
                      </del>
                      <span className="inline-block rounded font-bold text-xs md:text-sm bg-primary/10  text-primary uppercase px-2 py-1 ml-2.5 ">
                        {discount} off
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center mt-2 md:px-3">
                  <div className="flex md:-mx-0.5 ">
                    {[...Array(5)].map((_, idx) => (
                      <StarIcon
                        key={idx}
                        color={idx < product?.ratings ? "#F3B81F" : "#DFE6ED"}
                        className="w-3.5 lg:w-4 h-3.5 lg:h-4 mx-0.5"
                      />
                    ))}
                    <p className="text-[#F3B81F] ml-3 text-sm">
                      {product?.totalReviews} Reveiws
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <span className="border-t border-dashed w-full" />

          <div className="">
            <h3 className="text-xl text-gray-800 dark:text-white font-medium">
              Product Details:
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-200">
              {product?.description}
            </p>
          </div>
          <span className="border-t border-dashed w-full" />
        </div>
        <div className="">
          {Object.keys(variations).map((variation) => {
            return (
              <ProductAttributes
                key={`popup-attribute-key${variation}`}
                variations={variations}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-4">
            <Counter
              variant="single"
              value={selectedQuantity}
              onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
              onDecrement={() =>
                setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
              }
              disabled={
                isInCart(item._id)
                  ? getItemFromCart(item._id).quantity + selectedQuantity >=
                    Number(item.stock)
                  : selectedQuantity >= Number(item.stock)
              }
            />

            <button>
              <RefreshCwIcon className="w-5 h-5" />
              <span className="sr-only">Compare</span>
            </button>

            <button>
              <HeartIcon className="w-5 h-5" />
              <span className="sr-only">Wishlish</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Button
              onClick={addToCart}
              className="  flex items-center gap-3 w-full"
              disabled={!isSelected || addToCartLoader}
            >
              <Icons.cart className="ml-3 w-4 animate-pulse duration-600 transition " />
              <p>Add_TO_CART</p>
            </Button>
            <Button
              variant={"outline"}
              className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition duration-300 ease-in-out"
            >
              Buy Now
            </Button>
          </div>
        </div>
        <div
className={cn(
  !isEmpty(selectedVariation)
    ? selectedVariation?.quantity <= 15
      ? "block"
      : "hidden"
    : (product?.quantity as number) <= 15
    ? "block"
    : "hidden"
)}
>
<div>
  <h6 className="font-[calc(13px + 1 * (100vw - 320px) / 1600)] font-normal mb-2">
    Please hurry! Only{" "}
    {!isEmpty(selectedVariation)
      ? selectedVariation?.quantity
      : product?.quantity}
    left in stock
  </h6>
  <ProgressBar
    animated
    value={((product?.quantity ?? 1) * 100) / 10}
    color="rose"
  />
</div>
</div>

        <div className="py-4 border-t border-dashed w-full">
          <QuickViewShortDetails {...{ product, selectedVariation }} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

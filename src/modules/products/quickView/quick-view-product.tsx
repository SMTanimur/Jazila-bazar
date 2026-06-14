"use client";
import { Button } from "@/components/ui/button";
import Counter from "@/components/ui/counter";
import { Icons } from "@/components/ui/icons";
import usePrice from "@/hooks/use-price";
import { useCartStore } from "@/store/cart/cart.store";
import { useGlobalModalStateStore } from "@/store/modal";
import { IProduct } from "@/types";
import { generateCartItem } from "@/utils/generate-cart-item";
import { getVariations } from "@/utils/get-variations";
import { isEmpty, isEqual } from "lodash";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import ProductAttributes from "../product-attributes";
import ThumbnailCarousel from "../thumbnail-carousel";
import VariationPrice from "../variation-price";
import QuickViewShortDetails from "./quick-view-short-details";
export const QuickViewProduct = () => {
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const globalModal = useGlobalModalStateStore((state) => state);
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCartStore(
    (state) => state
  );
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const product = globalModal.quickViewState as IProduct;
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
        Object.values(attributes).sort()
      )
    );
  }

  const item = generateCartItem(product, selectedVariation);
  const outOfStock = isInCart(item._id) && !isInStock(item._id);
  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    const item = generateCartItem(product, selectedVariation)
    addItemToCart(item, selectedQuantity);
    // @ts-ignore
    toast.success("Product added to cart");
    globalModal.setQuickViewState(false, null);
  }
  return (
    <div className="px-6 py-4">
      <div className="mt-4 flex flex-col sm:flex-row gap-5">
        <div className="w-full sm:w-1/2 product-gallery  ">
          {!!product?.gallery?.length ? (
            <ThumbnailCarousel
              gallery={product?.gallery}
              isSingleProductPage={false}
            />
          ) : (
            <div className="flex items-center justify-center w-auto">
              <Image
                src={product?.image?.img_url as string}
                alt={name!}
                width={450}
                height={390}
                style={{ width: "auto" }}
              />
            </div>
          )}
        </div>

        <div className="w-full sm:w-1/2 ">
          <div className="flex flex-col space-y-4 justify-center">
            <div className="flex flex-col gap-1.5 justify-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                {product?.name}
              </h2>
              {product?.unit && isEmpty(variations) ? (
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
                <div className="flex items-baseline gap-2.5 mt-3">
                  <div className="text-primary font-black text-xl md:text-2xl xl:text-3xl">
                    {price}
                  </div>
                  {discount && (
                    <>
                      <del className="text-sm font-semibold text-slate-400 dark:text-slate-500 line-through">
                        {basePrice}
                      </del>
                      <span className="inline-block rounded-full font-extrabold text-[10px] md:text-xs bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 px-2.5 py-0.5 ml-1.5 shadow-sm uppercase tracking-wide">
                        {discount} off
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800/80 w-full" />

            <div className="space-y-1.5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Product Details
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {product?.description}
              </p>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800/80 w-full" />

            <QuickViewShortDetails {...{ product, selectedVariation }} />
          </div>
          <div className="py-2">
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
          <div className="flex items-center space-x-4 mt-2">
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
            <Button
              onClick={addToCart}
              className="flex items-center gap-2 rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md px-6 py-2"
              disabled={!isSelected}
            >
              <Icons.cart className="w-4 h-4" />
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

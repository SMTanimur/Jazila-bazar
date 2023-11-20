"use client";
import usePrice from "@/hooks/use-price";
import { useGlobalModalStateStore } from "@/store/modal";
import { IProduct } from "@/types";
import { getVariations } from "@/utils/get-variations";
import { isEmpty, isEqual } from "lodash";
import { useState } from "react";
import ProductAttributes from "../product-attributes";
import VariationPrice from "../variation-price";
import QuickViewShortDetails from "./quick-view-short-details";
import { Button } from "@/components/ui/button";
import ThumbnailCarousel from "../thumbnail-carousel";
import Image from "next/image";
export const QuickViewProduct = () => {
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const globalModal = useGlobalModalStateStore((state) => state);
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
  return (
    <div className="px-6 py-4">
      <div className="mt-4 flex flex-col sm:flex-row gap-5">
        <div className="w-full sm:w-1/2  ">
        {!!product?.gallery?.length ? (
                <ThumbnailCarousel gallery={product?.gallery}  />
              ) : (
                <div className="flex items-center justify-center w-auto">
                  <Image
                    src={product?.image?.img_url as string}
                    alt={name!}
                    width={450}
                    height={390}
                    style={{ width: 'auto' }}
                  />
                </div>
              )}
        </div>

        <div className="w-full sm:w-1/2 ">
          <div className="flex flex-col space-y-3 justify-center">
            <div className="flex flex-col gap-2 justify-center">
              <h2 className="text-xl font-medium text-gray-800">
                {product?.name}
              </h2>
              {product?.unit && isEmpty(variations) ? (
                <div className="text-sm font-medium md:text-15px">
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
                <div className="flex items-center mt-5 ">
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
              )}
            </div>
            <span className="border-t border-dashed w-full" />

            <div className="">
             <h3 className="text-xl text-gray-800 font-medium">Product Details:</h3>
             <p className="text-sm text-gray-600">{product?.description}</p>
            </div>

            <QuickViewShortDetails {...{ product, selectedVariation }} />
          </div>
          <div className="py-4">
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
          <div className="flex items-center space-x-4">
      <Button
       variant={"outline"}
       size={"lg"}
      className="flex items-center space-x-2"
      >
      <span className="bg-gray-100 px-3 py-[2px] text-gray-600">
       -
      </span>
      <p>1</p>
      <span className="bg-gray-100 px-3 py-[2px] text-gray-600">+</span>
      </Button>
      <Button
      size={"lg"}
      >

      Add to Cart
      </Button>
      </div>
        </div>
      </div>
    </div>
  );
};

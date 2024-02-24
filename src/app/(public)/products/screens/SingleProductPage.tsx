"use client";
import SocialShareBox from "@/components/common/shared/social-share-box";
import Breadcrumb from "@/components/ui/breadcrumb";
import { ROUTES } from "@/configs/routes";
import { useProductQuery } from "@/hooks/api/product/useGetProduct";
import ProductDetailsTab from "@/modules/products/productDetails/product-tab";
import { IProduct } from "@/types";
import { GlobeIcon, SmartphoneIcon } from "lucide-react";
import Image from "next/image";
import ProductDetails from "./ProductDetails";
import { useEffect, useState } from "react";

type Props = {
  productSlug: string;
};
const SingleProductPage = ({ productSlug }: Props) => {
  const { data, isLoading } = useProductQuery(productSlug);
  const productUrl = `${process.env.NEXT_PUBLIC_APP_URL}${ROUTES.PRODUCT}/${productSlug}`;
  const [productState, setProductState] = useState<IProduct>()
  useEffect(() => {
    if (data) {
     
      setProductState(data);
    }
  }, [data, isLoading]);
  return (
    <div className="py-5 ">
      <section className="  h-12 py-10  bg-gray-100 dark:bg-gray-900 flex justify-center items-center ">
        <Breadcrumb />
      </section>

      <div className="flex flex-col space-y-5 xl:flex-row  xl:space-x-6 container py-8">
        <div className="w-full xl:w-[75%] overflow-hidden ">
          <ProductDetails {...{ product: data as IProduct }} />
        </div>
        <div className="w-full xl:w-[25%] ">
          <div className="flex  space-y-5 bg-gray-100 dark:bg-background flex-col py-4 sm:px-4 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 py-4 px-4 w-full flex gap-4 items-center ">
              <div className="max-w-[80px] w-full">
                <Image
                  src={data?.shop.logo.img_url as string}
                  alt={data?.shop.name as string}
                  width={80}
                  height={80}
                  className="rounded-full "
                />
              </div>
              <div>
                <h1 className="text-primary text-lg font-semibold">
                  {data?.shop.name}
                </h1>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-sm text-gray-400">{data?.shop.description}</p>
              <span className=" w-full border-dotted border-t-2 mt-4" />
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <SmartphoneIcon className="w-4 text-primary" />
                  <p className="text-base text-gray-900 dark:text-white font-medium">
                    Contact:
                  </p>
                </span>
                <p>{data?.shop.settings?.contact}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="flex items-center gap-1 sm:gap-2">
                  <GlobeIcon className="w-4 text-primary" />
                  <p className="text-xs sm:text-base text-gray-900 dark:text-white font-medium">
                    Website:
                  </p>
                </span>
                <p className="text-xs sm:text-base">
                  {data?.shop.settings?.website}
                </p>
              </div>
            </div>

            <SocialShareBox
              className={`  transition-all duration-300 `}
              shareUrl={productUrl}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <ProductDetailsTab {...{ product: productState  as IProduct}} />
      </div>
    </div>
  );
};

export default SingleProductPage;

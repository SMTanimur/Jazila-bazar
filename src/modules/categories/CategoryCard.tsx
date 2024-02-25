/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/configs/routes";
import { ICategory } from "@/types";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  category: ICategory;
}
const CategoryCard = ({ category }: Props) => {
  return (
    <React.Fragment>
      <div className=" dark:bg-gray-900 bg-[#f5f5f5] rounded-xl relative group w-[170px] select-none xs:h-[250px] h-[216px] overflow-hidden px-5 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/10  space-y-4 group flex flex-col justify-center pt-2 sm:pt-0 ">
        <div className="flex flex-col  -mt-8">
          <h5 className="text-xl text-gray-800 dark:text-white font-semibold group-hover:scale-105 group-hover:text-primary transition-all duration-300 w-full text-ellipsis line-clamp-1 ">
            { category.name}
          </h5>
          <p className="text-stone-600 dark:group-hover:text-white">
            {category.products_count} Items
          </p>
        </div>

        <div className=" max-w-[120px] max-h-[120px]  w-full flex justify-center items-center">
          <Image
            className="object-center xs:mt-8  h-[120px] group-hover:scale-110 hover:transition-all duration-500"
            height={120}
            width={110}
            src={category.image?.img_url}
            alt={category.name}
          />
        </div>
        <Button className="absolute -bottom-10 left-1/2 -translate-x-1/2 transform transition-all w-[140px] duration-500 group-hover:bottom-6 rounded-lg">
          <Link href={`${ROUTES.PRODUCT}?category=${category.slug}`} className="flex gap-3 items-center">
            <p>Shop Now</p>
            <ChevronRightIcon className="w-5" />
          </Link>
        </Button>
      </div>
    </React.Fragment>
  );
};

export default CategoryCard;

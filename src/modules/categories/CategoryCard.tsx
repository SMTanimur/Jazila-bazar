/* eslint-disable @next/next/no-img-element */
import { ICategory } from "@/types";
import React from "react";

interface Props {
  category: ICategory;
}
const CategoryCard = ({ category }: Props) => {
  return (
    <React.Fragment>
      <div className=" dark:bg-[#1f1f1f] bg-[#f5f5f5] rounded-lg relative group w-[170px] select-none xs:h-[250px] h-[216px] overflow-hidden px-5 cursor-pointer hover:bg-primary/10 transition duration-300">
        <div className="flex flex-col  mt-3">
          <h5 className="text-xl text-gray-800 dark:text-white font-semibold ">
            {category.name}
          </h5>
          <p className="text-stone-600">{category.products_count} Items</p>
        </div>

        <div className="">
          <img
            className=" w-[130px] h-[100px] object-center hover:scale-110 hover:transition-all duration-500"
            src={category.image?.img_url}
            alt={category.name}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CategoryCard;

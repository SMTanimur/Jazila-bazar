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
    <Link
      href={`${ROUTES.PRODUCT}?category=${category.slug}`}
      className="relative group w-[170px] select-none xs:h-[250px] h-[216px] rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950/80 p-5 flex flex-col items-center justify-between overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-md cursor-pointer"
    >
      {/* Background glow hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Title & Count Section */}
      <div className="w-full text-center z-10 flex flex-col items-center">
        <h5 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors duration-300 w-full truncate px-1">
          {category.name}
        </h5>
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5 bg-slate-200/50 dark:bg-slate-800/60 px-2 py-0.5 rounded-full transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
          {category.products_count} Items
        </span>
      </div>

      {/* Image Section */}
      <div className="relative w-28 h-28 flex justify-center items-center z-10 transition-transform duration-500 ease-out group-hover:scale-108 group-hover:-translate-y-2">
        {category.image?.img_url ? (
          <Image
            className="object-contain"
            height={112}
            width={112}
            src={category.image.img_url}
            alt={category.name}
          />
        ) : (
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <span className="text-xs text-slate-400">No Image</span>
          </div>
        )}
      </div>

      {/* Hover action indicator */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[130px] transition-all duration-500 ease-out group-hover:bottom-4 z-20">
        <div className="flex gap-2 items-center justify-center bg-primary text-primary-foreground font-semibold text-xs py-2 px-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors duration-200">
          <span>Shop Now</span>
          <ChevronRightIcon className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

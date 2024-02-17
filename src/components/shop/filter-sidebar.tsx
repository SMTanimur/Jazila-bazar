import { useGlobalModalStateStore } from "@/store/modal";
import { ArrowLeftIcon } from "lucide-react";
import Scrollbar from "../ui/scrollbar";
import { ProductsFilters } from "./products-filter";

const FilterSidebar = () => {
  const { closeSideFilter } = useGlobalModalStateStore((state) => state);
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="w-full border-b border-gray-100 flex justify-between items-center relative ltr:pr-5 rtl:pl-5 ltr:md:pr-7 rtl:md:pl-7 flex-shrink-0 py-0.5">
        <button
          className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
          onClick={closeSideFilter}
          aria-label="close"
        >
          <ArrowLeftIcon className="w-4 h-4 text-gray-900 dark:text-white" />
          <span className="sr-only">left</span>
        </button>
        <h2 className="font-bold text-xl md:text-2xl m-0 text-gray-900 w-full text-center pr-6 ">
          Filters
        </h2>
      </div>

      <Scrollbar className="menu-scrollbar flex-grow mb-auto">
        <div className="flex flex-col py-7 px-5 md:px-7 text-heading">
          <ProductsFilters  />
        </div>
      </Scrollbar>
    </div>
  );
};

export default FilterSidebar;

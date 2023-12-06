import { FilterIcon } from "lucide-react";
import Drawer from "../ui/drawer";
import { useGlobalModalStateStore } from "@/store/modal";
import FilterSidebar from "./filter-sidebar";


export default function SearchTopBar() {
 const {sideFilter,onSideFilter,closeSideFilter}= useGlobalModalStateStore((state)=>state)

  return (
    <div className="flex justify-between items-center mb-7">
      {/* <Text variant="pageHeading" className="hidden lg:inline-flex pb-1">
        {t('text-casual-wear')}
      </Text> */}
      <button
        className="lg:hidden text-gray-900 dark:text-white text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
        onClick={onSideFilter}
      >
        <FilterIcon className="w-4" />
        <span className="pl-2.5 ">Filters</span>
      </button>
      {/* TODO: need to use just one drawer component */}
      <Drawer
        variant={ 'left' }
        open={sideFilter}
        onClose={closeSideFilter}
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
}

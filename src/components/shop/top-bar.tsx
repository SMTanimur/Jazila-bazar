import { FilterIcon } from "lucide-react";
import Drawer from "../ui/drawer";
import { useGlobalModalStateStore } from "@/store/modal";
import FilterSidebar from "./filter-sidebar";


interface SearchTopBarProps {
  totalDocs?: number;
  showingDocs?: number;
}

export default function SearchTopBar({ totalDocs = 0, showingDocs = 0 }: SearchTopBarProps) {
  const { sideFilter, onSideFilter, closeSideFilter } = useGlobalModalStateStore((state) => state);

  return (
    <div className="flex justify-between items-center mb-6 bg-slate-50/50 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-100/80 dark:border-slate-800/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-slate-700 dark:text-slate-300 text-xs px-3.5 py-2 font-bold border border-slate-200 dark:border-slate-800 rounded-lg flex items-center transition hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          onClick={onSideFilter}
        >
          <FilterIcon className="w-3.5 h-3.5 mr-2" />
          <span>Filters</span>
        </button>
        <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
          We found <span className="text-primary font-bold">{totalDocs}</span> products for you!
        </p>
      </div>

      <div className="text-xs md:text-sm font-semibold text-slate-400 dark:text-slate-500">
        Showing {showingDocs} of {totalDocs} items
      </div>

      <Drawer
        variant={'left'}
        open={sideFilter}
        onClose={closeSideFilter}
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
}

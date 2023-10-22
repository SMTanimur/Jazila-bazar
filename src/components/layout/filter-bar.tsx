import { cn } from "@/lib/utils";
import { FilterIcon } from "lucide-react";
import GroupsDropdownMenu from "./manu/groups-menu";


export default function FilterBar({
  className,
  variables,
}: {
  className?: string;
  variables: any;
}) {



  return (
    <div
      className={cn(
        'sticky top-14 z-10 flex h-14 items-center justify-between border-t border-b border-border-200 bg-light py-3 px-5 md:top-16 md:h-16 lg:top-22 lg:px-7 xl:hidden',
        className
      )}
    >
      <button
        onClick={() =>null
          // setDrawerView({ display: true, view: 'FILTER_VIEW', data: variables })
        }
        className="flex h-8 items-center rounded border border-border-200 bg-gray-100 bg-opacity-90 py-1 px-3 text-sm font-semibold text-heading transition-colors duration-200 hover:border-accent-hover hover:bg-accent hover:text-light focus:border-accent-hover focus:bg-accent focus:text-light focus:outline-0 md:h-10 md:py-1.5 md:px-4 md:text-base"
      >
        <FilterIcon width="18" height="14" className="mr-2 " />
       Filter
      </button>
      <GroupsDropdownMenu />
    </div>
  );
}

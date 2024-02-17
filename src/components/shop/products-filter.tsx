import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoryFilter } from "./category-filter";
import { FilteredItem } from "./filtered-item";
import useQueryParam from "@/hooks/use-query-params";
import { useEffect, useState } from "react";
import { PriceFilter } from "./price-filter";
export const ProductsFilters: React.FC = () => {
    const { push } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { clearQueryParam, updateQueryparams } = useQueryParam(pathname ?? "/");
    const [state, setState] = useState({});
  
    useEffect(() => {
      setState({});
      searchParams?.forEach((value, key) => {
        if (value.includes(",")) {
          setState((prev) => {
            return { ...prev, [key]: value.split(",") };
          });
        } else {
          setState((prev) => {
            return { ...prev, [key]: value };
          });
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);
  
    function handleArrayUpdate(key: string, item: string) {
      let o = searchParams?.get(key)?.split(",");
      if (o?.includes(item)) {
        updateQueryparams(key, o.filter((i) => i !== item).join(","));
      }
    }
	return (
		<div className="pt-1 ">
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<div className="flex items-center justify-between mb-2.5">
					<h2 className="font-semibold text-heading text-xl md:text-2xl">
						Filters
					</h2>
					<button
						className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
						aria-label="Clear All"
						onClick={() => {
							push(pathname)
						}}
					>
						Clear all
					</button>
				</div>
				<div className="flex flex-wrap -m-1">
              {Object.entries(state).map(([key, value]) => {
                if (Array.isArray(value)) {
                  return value.map((item) => (
                    <FilteredItem
                      itemKey={key ? key : " "}
                      key={item}
                      itemValue={item as any}
                      onClick={() => handleArrayUpdate(key, item)}
                    />
                  ));
                } else {
                  return (
                    <FilteredItem
                      itemKey={key ? key : " "}
                      key={key}
                      itemValue={value as any}
                      onClick={() => {
                        clearQueryParam([key]);
                      }}
                    />
                  );
                }
              })}
            </div>
			</div>

			<CategoryFilter />
      <PriceFilter/>
			
		</div>
	);
};

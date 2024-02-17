import { useGetCategoriesQuery } from "@/hooks/api/category/useGetCategoriesQuery";
import useQueryParam from "@/hooks/use-query-params";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export const CategoryFilter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? "/");
  const [formState, setFormState] = useState<string[]>([]);

  const hasQueryKey = searchParams?.get("category");

 


  const { data } = useGetCategoriesQuery({
    limit: 10,
  });
  const items = data?.docs;


  useEffect(() => {
    updateQueryparams("category", formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);
  
  useEffect(() => {
    setFormState(hasQueryKey?.split(",") ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  function handleItemClick(slug: string) {
    setFormState((prevFormState) =>
      prevFormState.includes(slug)
        ? prevFormState.filter((item) => item !== slug)
        : [...prevFormState, slug]
    );
  }

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <div className="text-gray-900 dark:text-white text-sm md:text-base font-semibold mb-7 ">
        <h6>Categories</h6>
        <div className="border-b border-primary w-[85px] mt-1" />
      </div>
      <div className="mt-2 flex flex-col space-y-4">
        {items?.map((item: any) => (
          <div key={item.slug} className="flex items-center space-x-3">
            <Checkbox
              name={item.name.toLowerCase()}
              checked={formState.includes(item.slug)}
              value={item.slug}
              onCheckedChange={() => handleItemClick(item.slug)}
            />

            <Label>{item.name}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

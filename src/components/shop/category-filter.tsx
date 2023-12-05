import { useGetCategoriesQuery } from "@/hooks/api/category/useGetCategoriesQuery";
import useQueryParam from "@/hooks/use-query-params";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CheckBox } from "../common/shared/checkbox";


export const CategoryFilter = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? "/");
  const [formState, setFormState] = useState<string[]>([]);

  const hasQueryKey = searchParams?.get("category");

  useEffect(() => {
    updateQueryparams("category", formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey?.split(",") ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  const { data, isLoading } = useGetCategoriesQuery({
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

  if (isLoading) return <p>Loading...</p>;

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    setFormState(
      formState.includes(value)
        ? formState.filter((item) => item !== value)
        : [...formState, value]
    );
  }

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <div className="text-gray-900 dark:text-white text-sm md:text-base font-semibold mb-7 ">
        <h6>Categories</h6>
        <div className="border-b border-primary w-[85px] mt-1"/>
        
      </div>
      <div className="mt-2 flex flex-col space-y-4">
        {items?.map((item: any) => (
        

          <CheckBox
          	key={item.id}
          	label={item.name}
          	name={item.name.toLowerCase()}
          	checked={formState.includes(item.slug)}
          	value={item.slug}
          	onChange={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};

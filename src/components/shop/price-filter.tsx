import useQueryParam from "@/hooks/use-query-params";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const priceFilterItems = [
  {
    id: "1",
    name: "Under $50",
    slug: "0-50",
  },
  {
    id: "2",
    name: "$50 to $100",
    slug: "50-100",
  },
  {
    id: "3",
    name: "$100 to $150",
    slug: "100-150",
  },
  {
    id: "4",
    name: "$150 to $200",
    slug: "150-200",
  },
  {
    id: "5",
    name: "$200 to $300",
    slug: "200-300",
  },
  {
    id: "6",
    name: "$300 to $500",
    slug: "300-500",
  },
  {
    id: "7",
    name: "$500 to $1000",
    slug: "500-1000",
  },
  {
    id: "8",
    name: "Over $1000",
    slug: "1000-",
  },
];
export const PriceFilter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? "/");
  const [formState, setFormState] = useState<string[]>([]);

  const hasQueryKey = searchParams?.get("price");

  useEffect(() => {
    updateQueryparams("price", formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey?.split(",") ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);


  const items = priceFilterItems;

  function handleItemClick(slug: string) {
    setFormState((prevFormState) =>
      prevFormState.includes(slug)
        ? prevFormState.filter((item) => item !== slug)
        : [...prevFormState, slug]
    );
  }

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        Price
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        {items?.map((item: any) => (
          <div key={item.slug} className="flex items-center space-x-3">
            <Checkbox
              name={item.name.toLowerCase()}
              checked={formState.includes(item.slug)}
              onCheckedChange={() => handleItemClick(item.slug)} // Pass the slug to handleItemClick
            />

            <Label>{item.name}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

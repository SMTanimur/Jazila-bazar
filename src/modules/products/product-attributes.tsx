import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  variations: any;
  attributes: any;
  setAttributes: (key: any) => void;
}

const ProductAttributes: React.FC<Props> = ({
  className = "mb-2 pt-0.5",
  variations,
  attributes,
  setAttributes,
}) => {
  if (!variations) return null;
  return (
    <>
      {Object.keys(variations).map((variationName, index) => (
        <div className={cn(className,"flex items-center gap-4")} key={index} 
         
        >
          <h4 className="mb-3 font-normal capitalize text-15px text-primary text-opacity-70">
            {variationName.split("-").join(" ")}:
          </h4>

          <ul className="flex flex-wrap ltr:-mr-2 -ml-2">
            {variations[variationName].map((attribute: any, index: any) => (
              <li
                key={index}
                className={cn(
                  "cursor-pointer rounded border h-9 md:h-10 p-1 mb-2 md:mb-3  ml-2 flex justify-center items-center font-medium text-sm md:text-15px text-primary transition duration-200 ease-in-out hover:text-primary hover:border-primary px-3",
                  {
                    "border-primary text-primary bg-primary text-white hover:text-white":
                      attributes[variationName] === attribute.value,
                  }
                )}
                onClick={() =>
                  setAttributes((prev: any) => ({
                    ...prev,
                    [variationName]: attribute.value,
                  }))
                }
              >
                {attribute.value} {attribute?.meta ? attribute.meta : ""}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default ProductAttributes;

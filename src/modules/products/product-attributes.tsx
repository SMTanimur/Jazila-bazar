import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  variations: any;
  attributes: any;
  color?: string;
  setAttributes: (key: any) => void;
  [key: string]: unknown;
}

const ProductAttributes: React.FC<Props> = ({
  className = "mb-2 pt-0.5",
  variations,
  attributes,
  color,
  setAttributes,
}) => {
  if (!variations) return null;
  return (
    <>
      {Object.keys(variations).map((variationName, index) => (
        <div className={cn(className, "flex items-center gap-4")} key={index}>
          <h4 className="mb-3 font-normal capitalize text-15px text-primary text-opacity-70">
            {variationName.split("-").join(" ")}:
          </h4>

          <ul className="flex flex-wrap -mr-2 -ml-2">
            {variations[variationName].map((attribute: any, index: any) => (
              <React.Fragment 
              key={index}
              >
                {variationName === "color" ? (
                  <div
                
                    role="button"
                    onClick={() =>
                      setAttributes((prev: any) => ({
                        ...prev,
                        [variationName]: attribute.value,
                      }))
                    }
                    className={cn(
                      "h-11 w-11 p-0.5 flex items-center justify-center border-2 rounded-full border-transparent cursor-pointer",
                      {
                        "border-primary text-primary bg-primary text-white hover:text-white":
                          attributes[variationName] === attribute.value,
                      }
                    )}
                  >
                    <span
                      className="w-full h-full rounded-full border border-border-200"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ) : (
                  <li
                    key={index}
                    className={cn(
                      "cursor-pointer rounded border dark:border-primary h-9 md:h-10 p-1 mb-2 md:mb-3  ml-2 flex justify-center items-center font-medium text-sm md:text-15px text-primary transition duration-200 ease-in-out hover:text-primary hover:border-primary px-3",
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
                    {attribute.value}
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default ProductAttributes;

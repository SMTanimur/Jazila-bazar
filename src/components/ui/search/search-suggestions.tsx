"use client";
import { IProduct } from "@/types";
import { useGetProductsQuery } from "@/hooks/api/product/useGetProducts";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SearchSuggestionsProps {
  searchTerm: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: IProduct) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  searchTerm,
  isOpen,
  onClose,
  onSelect,
}) => {
  const { data, isLoading } = useGetProductsQuery(
    {
      text: searchTerm,
      limit: 5,
    },
    {
      enabled: isOpen && searchTerm.length >= 2,
    }
  );

  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !searchTerm || searchTerm.length < 2) {
    return null;
  }

  const products = data?.docs || [];

  return (
    <div
      ref={suggestionsRef}
      className="absolute top-full left-0 right-0 z-50 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-[400px] overflow-y-auto"
    >
      {isLoading ? (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      ) : products.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No products found
        </div>
      ) : (
        <ul className="py-2">
          {products.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/products/${product.slug}`}
                onClick={() => onSelect(product)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                )}
              >
                <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {product.image?.img_url ? (
                    <Image
                      src={product.image.img_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {product.description}
                  </p>
                </div>
                <div className="text-sm font-semibold text-primary">
                  ${product.price}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSuggestions;

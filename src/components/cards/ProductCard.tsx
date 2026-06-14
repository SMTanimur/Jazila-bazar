import usePrice from "@/hooks/use-price";
import { useCartStore } from "@/store/cart/cart.store";
import { useGlobalModalStateStore } from "@/store/modal";
import { IProduct } from "@/types";
import { generateCartItem } from "@/utils/generate-cart-item";
import { calculateDiscountPercentage } from "@/utils/util";
import { EyeIcon, HeartIcon, RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "../ui/button";
import StarIcon from "../ui/star-icon";
import { cn } from "@/lib/utils";

interface Props {
  product: IProduct;
}

const ProductCard = ({ product }: Props) => {
  const { price, basePrice } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: "USD",
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: "USD",
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: "USD",
  });
  let selectedVariation: any = {};
  const globalModal = useGlobalModalStateStore((state) => state);
  const { addItemToCart } = useCartStore((state) => state);
  const item = generateCartItem(product, selectedVariation);
  const isVariation = (product.variation_options?.length as number) > 0;

  function addToCart() {
    if (isVariation) {
      return globalModal.setQuickViewState(true, product);
    }
    if (!isVariation) {
      addItemToCart(item, 1);
      // @ts-ignore
      toast.success("Product added to cart");
      globalModal.setQuickViewState(false, null);
    }
  }

  const originalPriceNum = Number(product.price);
  const salePriceNum = Number(product.sale_price);

  const discountPercent = originalPriceNum && salePriceNum && salePriceNum < originalPriceNum
    ? Number(
        calculateDiscountPercentage({
          originalPrice: originalPriceNum,
          salePrice: salePriceNum,
        })
      )
    : 0;

  return (
    <div className="flex flex-col group overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative h-full p-4 justify-between">
      {/* Image & Quick Action Overlay */}
      <div className="w-full min-h-[160px] flex items-center relative justify-center overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950 p-4">
        <Link href={`/products/${product.slug}`} className="z-10 transition-transform duration-500 ease-out group-hover:scale-108">
          {product.image?.img_url ? (
            <Image
              className="object-contain"
              src={product.image.img_url}
              alt={product.name}
              width={130}
              height={130}
            />
          ) : (
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <span className="text-xs text-slate-400">No Image</span>
            </div>
          )}
        </Link>

        {/* Floating Quick Action Drawer */}
        <div className="absolute -bottom-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-100 dark:border-slate-800 shadow-md rounded-xl group-hover:bottom-4 transition-all duration-300 py-1 px-2.5 z-20 flex items-center gap-1">
          <button
            onClick={() => globalModal.setQuickViewState(true, product)}
            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <EyeIcon className="w-4 h-4" />
            <span className="sr-only">Quick View</span>
          </button>
          <span className="w-px h-3.5 bg-slate-200 dark:bg-slate-700" />
          <button className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <RefreshCwIcon className="w-4 h-4" />
            <span className="sr-only">Compare</span>
          </button>
          <span className="w-px h-3.5 bg-slate-200 dark:bg-slate-700" />
          <button className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <HeartIcon className="w-4 h-4" />
            <span className="sr-only">Wishlist</span>
          </button>
        </div>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-rose-500 dark:bg-rose-600 text-white font-extrabold text-[10px] md:text-xs px-2 py-0.5 rounded-full shadow-sm z-10">
            -{Math.round(discountPercent)}%
          </div>
        )}
      </div>

      {/* Info & Price Section */}
      <div className="flex flex-col flex-1 justify-between mt-4">
        <div>
          <Link
            className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 hover:text-primary transition-colors duration-200 w-full line-clamp-1"
            href={`/products/${product.slug}`}
          >
            {product.name}
          </Link>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
            {product.unit || "1 (items)"}
          </p>
        </div>

        <div className="flex gap-2.5 items-baseline mt-2">
          <span className="text-primary font-bold text-sm xs:text-base md:text-lg">
            {product.product_type === "variable"
              ? `${minPrice} - ${maxPrice}`
              : price}
          </span>
          {basePrice && (
            <del className="text-xs text-slate-400 dark:text-slate-500 line-through">
              {basePrice}
            </del>
          )}
        </div>
      </div>

      {/* Rating & Stock Indicator */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex -mx-0.5">
          {[...Array(5)].map((_, idx) => (
            <StarIcon
              key={idx}
              color={idx < product.ratings ? "#F59E0B" : "#E2E8F0"}
              className="w-3.5 h-3.5 mx-0.5"
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <span className={cn(
            "w-2 h-2 rounded-full",
            product.in_stock ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
          )} />
          <span className={product.in_stock ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="outline"
        className="mt-4 w-full rounded-xl border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 font-bold text-xs py-2 h-9"
        onClick={addToCart}
      >
        <span className="sm:hidden">Add</span>
        <span className="hidden sm:block">Add to Cart</span>
      </Button>
    </div>
  );
};

export default ProductCard;

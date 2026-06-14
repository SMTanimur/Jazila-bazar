import { IProduct } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  product: IProduct;
  selectedVariation: any;
}

const QuickViewShortDetails = ({ product, selectedVariation }: Props) => {
  const qty = selectedVariation ? selectedVariation.quantity : product?.quantity;
  const isAvailable = qty > 0;
  const sku = selectedVariation ? selectedVariation.sku : product?.sku;

  return (
    <div className="border border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/20 p-4 rounded-2xl flex flex-col gap-3 text-xs md:text-sm text-slate-600 dark:text-slate-300 w-full">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800/60">
        <span className="font-semibold text-slate-400 dark:text-slate-500">SKU</span>
        <span className="font-bold text-slate-800 dark:text-slate-100">{sku || "N/A"}</span>
      </div>
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800/60">
        <span className="font-semibold text-slate-400 dark:text-slate-500">Stock Status</span>
        <div className="flex items-center gap-1.5 font-bold">
          <span className={cn(
            "w-2 h-2 rounded-full",
            isAvailable ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
          )} />
          <span className={isAvailable ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
            {isAvailable ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-semibold text-slate-400 dark:text-slate-500">Availability</span>
        <span className="font-bold text-slate-800 dark:text-slate-100">
          {qty} Items left
        </span>
      </div>
    </div>
  );
};

export default QuickViewShortDetails;

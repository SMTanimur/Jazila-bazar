import { IProduct } from "@/types";
import { EyeIcon, HeartIcon, RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import { Card } from "../ui/card";

interface Props {
  product: IProduct;
}
const ProductCard = ({ product }: Props) => {
  return (
    <div className="w-[210px] h-auto">
      <Card className="bg-gray-200 shadow-sm rounded-md w-full h-full group flex flex-col px-4 py-5 cursor-pointer">
        <div className="w-full min-h-[150px] flex items-center relative justify-center overflow-hidden px-4">
          <Image
            className="object-center group-hover:scale-110 transition-all duration-700 "
            src={product.image?.img_url as string}
            alt={product.name}
            width={150}
            height={100}
          />
          <div className="absolute -bottom-12 bg-white rounded-md group-hover:bottom-5 transition-all duration-500 py-3 px-4 flex items-center space-x-2">
            <button>
              <EyeIcon className="w-5 h-5" />
              <span className="sr-only">Quick View</span>
            </button>
            <span className="border-l-2 h-full" />
            <button>
              <RefreshCwIcon className="w-5 h-5" />
              <span className="sr-only">Compare</span>
            </button>
            <div className="border border-l-2 h-full"></div>

            <button>
              <HeartIcon className="w-5 h-5" />
              <span className="sr-only">Wishlish</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <h5 className="text-base font-semibold text-gray-800 dark:text-white">
            {product.name.length > 18
              ? `${product.name.substring(0, 18)}...`
              : product.name}
          </h5>
          {product.unit ? (
            <p className="text-sm text-gray-600">{product.unit}</p>
          ) : <p className="text-sm text-gray-600">1(items)</p>}
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;

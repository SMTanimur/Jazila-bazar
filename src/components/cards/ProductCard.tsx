import { IProduct } from "@/types";
import Image from "next/image";
import { Card } from "../ui/card";
import { Icons } from "../ui/icons";

interface Props {
  product: IProduct;
}
const ProductCard = ({ product }: Props) => {
  return (
    <div className="max-w-[275px] h-auto">
      <Card className="bg-gray-200 shadow-sm rounded-md w-full h-full group flex flex-col px-8 py-5 cursor-pointer">
        <div className="w-full min-h-[150px] flex items-center relative justify-center overflow-hidden">
          <Image
            className="object-center group-hover:scale-110 transition-all duration-700 "
            src={product.image?.img_url as string}
            alt={product.name}
            width={150}
            height={100}
          />
          <div className="absolute -bottom-6 bg-white rounded-md group-hover:bottom-5 transition-all duration-500">
             <Icons.alarm className="w-5"/>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;

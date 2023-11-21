import { ImageInfo } from '@/types';
import isEmpty from 'lodash/isEmpty';
interface Item {
  _id: string
  name: string;
  slug: string;
  image?: ImageInfo
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
}
interface Variation {
  _id: string | number;
  title: string;
  price: number;
  sale_price?: number;
  quantity: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item, variation: Variation) {
 
  if (!isEmpty(variation)) {
    return {
      _id: `${item?._id}.${variation._id}`,
      productId: item?._id,
      name: `${name} - ${variation.title}`,
      slug:item?.slug,
      unit:item?.slug,
      stock: variation.quantity,
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: item?.image,
      variationId: variation._id,
    };
  }
  return {
    _id:item?._id,
    name:item?.name,
    slug:item?.slug,
    unit:item?.unit,
    image: item?.image,
    stock: item?.quantity,
    price: item?.sale_price ? item?.sale_price : item?.price,
  };
}

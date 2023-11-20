
import usePrice from '@/hooks/use-price';
import isEmpty from 'lodash/isEmpty';


export default function VariationPrice({
  selectedVariation,
  minPrice,
  maxPrice,
}: any) {
  const { price, basePrice, discount } = usePrice(
    selectedVariation && {
      amount: selectedVariation.sale_price
        ? selectedVariation.sale_price
        : selectedVariation.price,
      baseAmount: selectedVariation.price,
      currencyCode: 'USD',
    }
  );
  const { price: min_price } = usePrice({
    amount: minPrice,
    currencyCode: 'USD',
  });
  const { price: max_price } = usePrice({
    amount: maxPrice,
    currencyCode: 'USD',
  });
  return (
    <div className="flex items-center mt-5">
      <div className="text-primary font-bold text-base md:text-xl xl:text-[22px]">
        {!isEmpty(selectedVariation)
          ? `${price}`
          : `${min_price} - ${max_price}`}
      </div>
      {discount && (
        <>
          <del className="text-sm text-opacity-50 md:text-15px pl-3  text-pri">
            {basePrice}
          </del>
          <span className="inline-block rounded font-bold text-xs md:text-sm text-primary bg-opacity-20 bg-primary/10 uppercase px-2 py-1 ml-2.5 ">
            {discount} off
          </span>
        </>
      )}
    </div>
  );
}

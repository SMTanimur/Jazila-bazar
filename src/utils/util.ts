
type ICalculateDiscountPercentage = {
    originalPrice: number;
    salePrice: number;
  };
  
  export const calculateDiscountPercentage = ({
    originalPrice,
    salePrice,
  }: ICalculateDiscountPercentage) => {
    if (originalPrice > 0 && salePrice > 0) {
      const discount = ((originalPrice - salePrice) / originalPrice) * 100;
      return discount.toFixed(2); // Limiting to two decimal places
    }
  
    return salePrice
  };


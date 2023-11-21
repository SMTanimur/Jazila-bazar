

function EmptyCart() {

  return (
    <div className="flex flex-col items-center justify-center px-5 pt-8 pb-5 md:px-7">
      <div className="flex mx-auto w-[220px] md:w-auto">
        {/* <Image
          src="/assets/images/empty-cart.png"
          alt={t('text-empty-cart')}
          width={190}
          height={190}
          className="aspect-square"
        /> */}
      </div>
      <h5  className="mb-1.5 pt-8">
       Empty Cart
      </h5>
      
    </div>
  );
}

export default EmptyCart;

/* eslint-disable @next/next/no-img-element */
import CategoriesCarousel from "@/modules/categories/category-carousel";
import PromotionalBannerCarousel from "@/modules/home/promotional-banner-carousel";
export default function IndexPage() {
  return (
    <div className="py-3">
      <img
        src="https://res.cloudinary.com/smtanimur/image/upload/v1700110058/samples/fruite-Banner_c2mrgn.jpg"
        alt="Fruite Banner"
        className="w-full "
      />
      <div className="py-10 container">
        <div className="overflow-hidden">
          <PromotionalBannerCarousel />
        </div>
      </div>

      <div className="py-5 md:py-10 flex flex-col space-y-6 container">
        <h1 className="text-3xl font-bold font-sans ">Shop By Categories</h1>
        <CategoriesCarousel/>
      </div>
    </div>
  );
}

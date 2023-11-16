import PromotionalBannerCarousel from "@/modules/home/promotional-banner-carousel";
import { Image } from "@nextui-org/react";

export default function IndexPage() {
  return (
    <div className="py-3">
      <Image
        src="https://res.cloudinary.com/smtanimur/image/upload/v1700110058/samples/fruite-Banner_c2mrgn.jpg"
        alt="Fruite Banner"
        className="w-full caret-overlay"
      />
      <div className="py-10 container">
        <div className="overflow-hidden">
        <PromotionalBannerCarousel />
        </div>
        
      </div>
    </div>
  );
}

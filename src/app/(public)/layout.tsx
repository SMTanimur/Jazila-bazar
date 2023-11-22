
import ClientOnly from "@/components/common/shared/ClientOnly";
import HeaderBottom from "@/components/layout/HeaderBottom";
import TopBar from "@/components/layout/TopBar";
import BottomFixedSection from "@/components/layout/bottomFixedSection";
import { Footer } from "@/components/layout/footer";
import MobileNavigation from "@/components/layout/mobile-navigation";
import { SiteHeader } from "@/components/layout/site-header";
interface LobbyLayoutProps {
  children: React.ReactNode;
}
export default function LobbyLayout({ children }: LobbyLayoutProps) {

  return (
    <div className="relative">
      <TopBar/>
      <SiteHeader />
      <HeaderBottom/>
      <main className=" flex min-h-screen flex-col">{children}</main>
      <Footer />
      <ClientOnly>
        <MobileNavigation>
        
        </MobileNavigation>
      </ClientOnly>
      <BottomFixedSection/>
    </div>
  );
}

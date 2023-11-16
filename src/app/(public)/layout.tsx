
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
    <div className="relative flex min-h-screen flex-col">
      <TopBar/>
     
      <SiteHeader />
     
      
      <HeaderBottom/>
      <main className="flex-1">{children}</main>
      <Footer />
      <ClientOnly>
        <MobileNavigation>
          {/* <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={()=>push('/search')}
            className="flex items-center justify-center h-full p-2 focus:outline-none focus:text-primary"
          >
            <span className="sr-only">Search</span>
            <Icons.search width="17.05" height="18" />
          </motion.button> */}
        </MobileNavigation>
      </ClientOnly>
      <BottomFixedSection/>
    </div>
  );
}

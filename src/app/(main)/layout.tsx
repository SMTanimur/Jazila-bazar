"use client";
import ClientOnly from "@/components/common/shared/ClientOnly";
import HeaderBottom from "@/components/layout/HeaderBottom";
import TopBar from "@/components/layout/TopBar";
import BottomFixedSection from "@/components/layout/bottomFixedSection";
import MobileNavigation from "@/components/layout/mobile-navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Icons } from "@/components/ui/icons";
import { useHeaderSearch } from "@/hooks/useSearchHook";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
interface LobbyLayoutProps {
  children: React.ReactNode;
}

export default function LobbyLayout({ children }: LobbyLayoutProps) {
const {push}=useRouter()
  return (
    <div className="relative flex min-h-screen flex-col">
      <TopBar/>
      <SiteHeader />
      <HeaderBottom/>
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ClientOnly>
        <MobileNavigation>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={()=>push('/search')}
            className="flex items-center justify-center h-full p-2 focus:outline-none focus:text-primary"
          >
            <span className="sr-only">Search</span>
            <Icons.search width="17.05" height="18" />
          </motion.button>
        </MobileNavigation>
      </ClientOnly>
      <BottomFixedSection/>
    </div>
  );
}

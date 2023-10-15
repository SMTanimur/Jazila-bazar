"use client";
import MobileNavigation from "@/components/layout/mobile-navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Icons } from "@/components/ui/icons";
import { displayMobileHeaderSearchAtom } from "@/store/display-mobile-header-search-atom";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
interface LobbyLayoutProps {
  children: React.ReactNode;
}

export default function LobbyLayout({ children }: LobbyLayoutProps) {
  // const {data}= useMe()
  // const user = data
  // const {data:user}= useQuery(['me'],userClient.me)
  const [, setDisplayMobileHeaderSearch] = useAtom(
    displayMobileHeaderSearchAtom
  );
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <MobileNavigation>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setDisplayMobileHeaderSearch((prev) => !prev)}
          className="flex items-center justify-center h-full p-2 focus:outline-none focus:text-accent"
        >
          <span className="sr-only">Search</span>
          <Icons.search width="17.05" height="18" />
        </motion.button>
      </MobileNavigation>
    </div>
  );
}

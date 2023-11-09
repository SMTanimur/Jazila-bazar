"use client";

import { useMe } from "@/hooks/api/user/useMe";
import { IUser } from "@/types";
import Header from "./header";

interface SiteHeaderProps {
  user: IUser | null;
}

export function SiteHeader() {
  const { me } = useMe();
  return (
    <header className="sticky top-0 z-50 w-full border-b overflow-hidden bg-white">
      <div className="container flex h-16 items-center">
        <nav className="flex items-center space-x-2"></nav>

        {/* <MobileNav
        // mainNavItems={siteConfig.mainNav}
        // sidebarNavItems={dashboardConfig.sidebarNav}
        /> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Header />
        </div>
      </div>
    </header>
  );
}

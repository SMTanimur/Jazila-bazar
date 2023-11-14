"use client";

import Header from "./header";
import MobileHeader from "./MobileHeader";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full  overflow-hidden bg-white dark:bg-black">
      <div className="container flex h-16 items-center">
        <nav className="flex items-center space-x-2"></nav>

        {/* <MobileNav
        // mainNavItems={siteConfig.mainNav}
        // sidebarNavItems={dashboardConfig.sidebarNav}
        /> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Header />
    
          <div className="flex flex-1 items-center justify-end space-x-4 lg:hidden">
          <MobileHeader/>
          </div>
          
        </div>
      </div>
    </header>
  );
}

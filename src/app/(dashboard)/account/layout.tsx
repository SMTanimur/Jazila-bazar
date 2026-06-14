import ClientOnly from "@/components/common/shared/ClientOnly";
import BottomFixedSection from "@/components/layout/bottomFixedSection";
import { Footer } from "@/components/layout/footer";
import MobileNavigation from "@/components/layout/mobile-navigation";
import { SidebarMobile } from "@/components/layout/sidebar-mobile";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { SiteHeader } from "@/components/layout/site-header";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dashboardConfig } from "@/configs/dashboard";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-50/40 via-slate-50 to-emerald-50/20 dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-900/20 border-b border-slate-100 dark:border-slate-800/60 py-5 md:py-6 flex justify-center items-center my-6">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-72 h-72 rounded-full bg-rose-200/20 dark:bg-rose-900/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 h-72 rounded-full bg-emerald-200/20 dark:bg-emerald-900/10 blur-3xl pointer-events-none" />
        <Breadcrumb />
      </section>
      <div className="container flex-1 items-start md:grid md:grid-cols-[260px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-10 mb-8">
      
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden my-5">
            <Button size={"sm"} className="bg-purple-600 border-none">
              <Icons.menu className=" h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1"></div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <SidebarMobile
                items={dashboardConfig.sidebarNav}
                className="p-1"
              />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/signout">
                <Icons.logout className="mr-2 h-4 w-4" aria-hidden="true" />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <aside className="sticky max-w-[350px] bg-gray-100 dark:bg-gray-900  top-14 z-30 -ml-2 hidden h-[calc(83vh-3.5rem)] w-full shrink-0  border-r  md:block rounded-xl shadow-md ">
          
            <SidebarNav items={dashboardConfig.sidebarNav} className="" />
       
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
      
      <Footer />
      <ClientOnly>
        <MobileNavigation />
      </ClientOnly>
      <BottomFixedSection />
    </div>
  );
}

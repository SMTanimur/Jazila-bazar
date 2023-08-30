import { SidebarMobile } from '@/components/layout/sidebar-mobile';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/ui/icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { dashboardConfig } from '@/configs/dashboard';
import { useMe } from '@/hooks/api/user/useMe';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  // if (!user) {
  //   redirect('/signin');
  // }

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='md:hidden my-5'>
            <Button size={'sm'} className='bg-purple-600 border-none'>
              <Icons.menu className=' h-4 w-4' aria-hidden='true' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'></div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <SidebarMobile
                items={dashboardConfig.sidebarNav}
                className='p-1'
              />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href='/signout'>
                <Icons.logout className='mr-2 h-4 w-4' aria-hidden='true' />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block'>
          <ScrollArea className='py-6 pr-6 lg:py-8'>
            <SidebarNav items={dashboardConfig.sidebarNav} className='p-1' />
          </ScrollArea>
        </aside>
        <main className='flex w-full flex-col overflow-hidden'>{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}

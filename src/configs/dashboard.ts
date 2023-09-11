import { type SidebarNavItem } from '@/types';

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Account',
      href: '/dashboard/account',
      icon: 'user',
      items: [],
    },
    {
      title: 'Change Password',
      href: '/dashboard/change-password',
      icon: 'lock',
      items: [],
    },
    {
      title: 'My Order',
      href: '/dashboard/orders',
      icon: 'order',
      items: [],
    },
    {
      title: 'Wishlist',
      href: '/dashboard/wishlists',
      icon: 'wishlist',
      items: [],
    },
    {
      title: 'Chats',
      href: '/dashboard/chats',
      icon: 'message',
      items: [],
    },
    {
      title: 'Addresses',
      href: '/dashboard/addresses',
      icon: 'address',
      items: [],
    },
    {
      title: 'My Cards',
      href: '/dashboard/cards',
      icon: 'card',
      items: [],
    },
  ],
};

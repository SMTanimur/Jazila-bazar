import { type SidebarNavItem } from "@/types";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Account",
      href: "/account/dashboard",
      icon: "user",
      items: [],
    },
    {
      title: "Change Password",
      href: "/account/change-password",
      icon: "lock",
      items: [],
    },
    {
      title: "My Order",
      href: "/account/orders",
      icon: "order",
      items: [],
    },
    {
      title: "Wishlist",
      href: "/account/wishlists",
      icon: "wishlist",
      items: [],
    },
    {
      title: "Chats",
      href: "/account/chats",
      icon: "message",
      items: [],
    },
    {
      title: "Addresses",
      href: "/account/addresses",
      icon: "address",
      items: [],
    },
    {
      title: "My Cards",
      href: "/account/cards",
      icon: "card",
      items: [],
    },
  ],
};

import { type Icons } from '@/components/ui/icons';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export interface IUser {
  name: string;
  email: string;
  is_active?: boolean;
  role: string;
  _id: string;
  contact?: string;
  email_verified?: boolean;
  shop?: IShop;
  profile: IProfile;
  address?: IAddress[];
}

export interface IProfile {
  avatar?: ImageInfo;
  bio?: string;
  socials?: Record<string, any>[];
  contact?: string;
}

export type ImageInfo = {
  img_url: string;
  img_id: string;
};

export interface IShop {
  name: string;
  description: string;
  is_active: boolean;
  orders_count: number;
  products_count: number;
  slug: string;
  cover_image: ImageInfo;
  balance: IBalance;
  address: IShopAddress;
  _id: string;
  logo: ImageInfo;
  settings?: IShopSettings;
}

export interface IBalance {
  admin_commission_rate?: number;
  seller_commission_rate?: number;
  admin_commission?: number;
  total_earnings?: number;
  withdrawn_amount?: number;
  current_balance?: number;
  payment_info?: IPaymentInfo;
}

export interface IPaymentInfo {
  account?: string;
  name?: string;
  email?: string;
  bank?: string;
}

export interface IShopAddress {
  street_address: string;
  city: string;
  country: string;
  zip: string;
  state: string;
}

export interface IShopSettings {
  contact: string;
  website: string;
}

export interface IAddress {
  title: string;
  default: boolean;
  address: IAddressInfo;
  type: string;
  customer: IUser;
  _id: string;
}

export interface IAddressInfo {
  street_address: string;
  city: string;
  country: string;
  zip: string;
  state: string;
}

export enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  slug: string;
  is_active: boolean;
  shop: IShop;
  images: ImageInfo[];
  categories: ICategory[];

}

export interface ICategory {
  name: string;
  description: string;
  slug: string;
  is_active: boolean;
}

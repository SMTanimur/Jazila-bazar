import { type Icons } from "@/components/ui/icons";

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
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  is_active?: boolean;
  provider: string;
  provider_id?: string;
  role: string;
  _id: string;
  contact?: string;
  email_verified?: boolean;
  shop?: IShop;
  addresses?: IAddress[];
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

export interface IAddressData {
  name: string;
  country: string;
  street: string;
  customer: IUser;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  default: boolean;
}

export interface IAddress extends IAddressData {
  _id: string;
}

export interface IAddressInfo {
  street_address: string;
  city: string;
  country: string;
  zip: string;
  state: string;
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

export interface IImage {
  id: string;
  url: string;
  file: File | null;
}

export interface IFileHandler<T> {
  imageFile: T;
  setImageFile: React.Dispatch<React.SetStateAction<T>>;
  isFileLoading: boolean;
  onFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    callback?: (file?: IImage) => void
  ) => void;
  removeImage: (id: string) => void;
  clearFiles: () => void;
}

export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = "asc",
  /** Sort records in descending order. */
  Desc = "desc",
}

export interface Option {
  label: string;
  value: string;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}
export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface TypesIcon {
  value: keyof typeof Icons;
  label: string;
}

export interface ShopSideItem {
  title: string;
  href?: (shop: string) => string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}
export interface NavShopItemWithChildren extends ShopSideItem {
  items: NavShopItemWithChildren[];
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

export type ShopSidebarNavItem = NavShopItemWithChildren;

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  is_active?: boolean;
  provider: string;
  provider_id?: string;
  role: string;
  _id: string;
  contact?: string;
  email_verified?: boolean;
  shop?: IShop;
  addresses?: IAddress[];
}

export interface IShop {
  name: string;
  description: string;
  is_active: boolean;
  orders_count: number;
  products_count: number;
  slug: string;
  cover_image: ImageInfo;
  owner: IUser;
  balance: IBalance;
  address: IShopAddress;
  _id: string;
  logo: ImageInfo;
  createdAt: Date;
  settings?: IShopSettings;
}




export interface PaginatorInfo<T> {
  docs: T[];

  totalDocs: number;

  limit: number;

  // * Page info

  page: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPrevPage: boolean;

  nextPage: number;

  prevPage: number;

  pagingCounter: number;
}


export interface IBalance {
  _id?: string;
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

export interface IAddressData {
  name: string;
  country: string;
  street: string;
  customer: IUser;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  default: boolean;
}

export interface IAddress extends IAddressData {
  _id: string;
}

export interface IAddressInfo {
  street_address: string;
  city: string;
  country: string;
  zip: string;
  state: string;
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
  slug: string;
  icon?: string;
  _id: string;
  image: ImageInfo;
  type: IType;
  parent?: ICategory;
  children?: ICategory[];
  createdAt: Date;
  updatedAt: Date;
}
export interface IBanner {
  _id: string;
  type: IType;
  title: string;
  description: string;
  image: ImageInfo;
}

export interface IType {
  _id: string;
  name: string;
  icon: string;
  slug: string;
  banners: IBanner[];
  promotional_sliders: ImageInfo[];
}

export interface IImage {
  id: string;
  url: string;
  file: File | null;
}

export interface IFileHandler<T> {
  imageFile: T;
  setImageFile: React.Dispatch<React.SetStateAction<T>>;
  isFileLoading: boolean;
  onFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    callback?: (file?: IImage) => void
  ) => void;
  removeImage: (id: string) => void;
  clearFiles: () => void;
}

export interface QueryOptions {
  page: number;
  limit: number;
}

export interface ProductQueryOptions extends QueryOptions {
  shop_id: string;
  sortedBy: string;
  orderBy: string;
  name: string;
  categories: string;
  category: string;
  tags: string;
  type: string;
  manufacturer: string;
  author: string;
  price: string;
  min_price: string;
  max_price: string;
  text: string;
  searchType: string;
  searchQuery: string;
}

export interface PopularProductQueryOptions extends QueryOptions {
  type_slug: string;
  with: string;
  range: number;
}

export interface CategoryQueryOptions extends QueryOptions {
  parent: string | null;
  type: string;
}

export interface TagQueryOptions extends QueryOptions {
  parent: string | null;
  type: string;
}

export interface TypeQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface ShopQueryOptions extends QueryOptions {
  name: string;
  is_active: number;
}

export interface AuthorQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface ManufacturerQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface CouponQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

export interface OrderQueryOptions extends QueryOptions {
  name: string;
  orderBy: string;
}

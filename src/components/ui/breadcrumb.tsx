'use client';

import { cn } from '@/lib/utils';
import { capitalize, startCase } from 'lodash';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const getNiceTitle = (lastBreadcrumb: string) => {
  const normalized = lastBreadcrumb.toLowerCase();
  if (/^[0-9a-fA-F]{24}$/.test(lastBreadcrumb)) return 'Order Details';
  if (normalized === 'products') return 'Explore Our Fresh Products';
  if (normalized === 'fruits-vegetables') return 'Organic Fruits & Vegetables';
  if (normalized === 'beverages') return 'Refreshing Beverages';
  if (normalized === 'grocery-staples') return 'Daily Grocery & Staples';
  if (normalized === 'electronics-devices') return 'Modern Electronics & Devices';
  if (normalized === 'accessories') return 'Premium Accessories';
  if (normalized === 'beauty') return 'Natural Beauty Products';
  if (normalized === 'sports') return 'Sports & Fitness Collection';
  if (normalized === 'books') return 'Books & Knowledge Corner';
  if (normalized === 'fashion') return 'Trendy Fashion & Apparel';
  
  return capitalize(startCase(lastBreadcrumb));
};

const getCategoryTagline = (lastBreadcrumb: string) => {
  const normalized = lastBreadcrumb.toLowerCase();
  if (/^[0-9a-fA-F]{24}$/.test(lastBreadcrumb)) return 'View detailed information about your order and access your invoice.';
  if (normalized === 'products') return 'Handpicked premium items sourced directly from farms and trusted partners.';
  if (normalized === 'fruits-vegetables') return '100% organic and fresh produce harvested daily for your health.';
  if (normalized === 'beverages') return 'Stay hydrated and energized with our premium drinks and juices.';
  if (normalized === 'grocery-staples') return 'Essential ingredients for your daily meals, selected for quality.';
  if (normalized === 'electronics-devices') return 'Top-tier tech products and smart home gear.';
  if (normalized === 'accessories') return 'Curated essentials and fashion enhancements.';
  if (normalized === 'beauty') return 'Nourish your skin and look your best with organic beauty care.';
  if (normalized === 'sports') return 'High-performance equipment for athletes and fitness enthusiasts.';
  if (normalized === 'books') return 'Expand your mind with our literature, novels, and guides.';
  if (normalized === 'fashion') return 'Stylish clothes and footwear to express your personal style.';

  return 'Discover the best quality products for you and your family.';
};

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  const breadcrumbs = pathname.slice(1).split('/');
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
  return (
    <div className="container relative z-10 flex flex-col gap-y-3 sm:flex-row sm:justify-between sm:items-center sm:gap-y-0">
      <div className="flex flex-col gap-y-1 text-center sm:text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
          {breadcrumbs[0] === '' ? 'Dashboard' : getNiceTitle(lastBreadcrumb)}
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium max-w-sm sm:max-w-md">
          {getCategoryTagline(lastBreadcrumb)}
        </p>
      </div>

      <div className="flex items-center self-center sm:self-auto gap-x-1.5 md:gap-x-2 text-xs md:text-sm bg-white/60 dark:bg-slate-900/60 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-800/80 shadow-sm backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-x-1.5 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">
          <HomeIcon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" />
          <span>Home</span>
        </Link>
        <ChevronRightIcon className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const path = `/${breadcrumbs.slice(0, index + 1).join('/')}`;
          const isId = /^[0-9a-fA-F]{24}$/.test(breadcrumb);
          const displayLabel = isId ? 'Order Details' : (capitalize(startCase(breadcrumb)) || 'Dashboard');
          return (
            <React.Fragment key={index}>
              {isLast ? (
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[120px] sm:max-w-none">
                  {displayLabel}
                </span>
              ) : (
                <Link
                  href={path}
                  className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium"
                >
                  {displayLabel}
                </Link>
              )}
              {!isLast && (
                <ChevronRightIcon className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;

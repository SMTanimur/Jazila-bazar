'use client';

import { cn } from '@/lib/utils';
import { capitalize, startCase } from 'lodash';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  const breadcrumbs = pathname.slice(1).split('/');
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
  return (
    <div className="container relative z-10 flex flex-col items-center gap-y-2 sm:flex-row sm:justify-between sm:gap-y-0">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
        {breadcrumbs[0] === ''
          ? 'Dashboard'
          : capitalize(startCase(lastBreadcrumb))}
      </h1>

      <div className="flex items-center gap-x-1.5 md:gap-x-2 text-xs md:text-sm bg-white/60 dark:bg-slate-900/60 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-800/80 shadow-sm backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-x-1.5 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">
          <HomeIcon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" />
          <span>Home</span>
        </Link>
        <ChevronRightIcon className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const path = `/${breadcrumbs.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={index}>
              {isLast ? (
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[120px] sm:max-w-none">
                  {capitalize(startCase(breadcrumb)) || 'Dashboard'}
                </span>
              ) : (
                <Link
                  href={path}
                  className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium"
                >
                  {capitalize(startCase(breadcrumb)) || 'Dashboard'}
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

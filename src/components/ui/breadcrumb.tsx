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
    <div className="container  flex flex-col justify-between gap-y-1 sm:flex-row sm:gap-y-0">
            <h3 className="text-xl font-medium">
              {breadcrumbs[0] === ''
                ? 'Dashboard'
                : capitalize(startCase(lastBreadcrumb))}
            </h3>

            <div className="flex items-center gap-x-2">
              <HomeIcon className="w-5 h-5 text-primary"/>
              <Link href="/" className="text-sm font-medium text-primary">
                Home
              </Link>
              <ChevronRightIcon className="w-5 h-5 text-primary" />
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={index}>
                  <Link
                    href={{
                      pathname: `/${breadcrumbs.slice(0, index + 1).join('/')}`,
                    }}
                    className={cn(
                      'text-sm font-medium',
                      lastBreadcrumb === breadcrumb
                        ? 'text-gray-500'
                        : 'text-primary'
                    )}
                  >
                    {capitalize(startCase(breadcrumb)) || 'Dashboard'}
                  </Link>
                  {breadcrumb !== lastBreadcrumb && (
                    <ChevronRightIcon className="w-5 h-5 text-primary" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
  );
};

export default Breadcrumb;

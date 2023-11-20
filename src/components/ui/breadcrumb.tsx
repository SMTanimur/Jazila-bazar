'use client';

import React from 'react';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import useBreadcrumb, { convertBreadcrumbTitle } from '@/utils/use-breadcrumb';
import ActiveLink from './active-link';


interface Props {
  children: any;
}

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li
      className="text-sm text-primary/90 px-2.5 transition duration-200 ease-in  first:pr-0  last:pl-0 hover:text-primary/80 flex items-center"
      {...props}
    >
      {children}
    </li>
  );
};

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li className="text-base text-primary/70 mt-[1px]" {...props}>
      {children}
    </li>
  );
};

export const BreadcrumbItems = (props: any) => {
  let children: any = React.Children.toArray(props.children);

  children = children.map((child: string, index: number) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const lastIndex = children.length - 1;

  children = children.reduce((acc: any, child: string, index: number) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {props.separator}
        </BreadcrumbSeparator>
      );
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return (
    <div className="flex items-center borobazarBreadcrumb">
      <ol className="flex items-center w-full overflow-hidden ">{children}</ol>
    </div>
  );
};

const Breadcrumb: React.FC<{ separator?: string;  }> = ({
  separator = (
    <ChevronRightIcon className="text-primary text-opacity-40 w-5 h-5" />
  ),

}) => {
  const breadcrumbs = useBreadcrumb();

  return (
    <BreadcrumbItems separator={separator}>
      <ActiveLink
        legacyBehavior
        href={`/`}
        activeClassName="font-semibold text-heading"
      
      >
        <a className="inline-flex items-center">
          <HomeIcon className=" ml-1.5 text-primary w-4" />
          Home
        </a>
      </ActiveLink>

      {breadcrumbs?.map((breadcrumb: any) => (
        <ActiveLink
          href={breadcrumb.href}
          activeClassName="font-semibold text-heading"
          key={breadcrumb.href}
          legacyBehavior
       
        >
          <a className="capitalize">
            {convertBreadcrumbTitle(breadcrumb.breadcrumb)}
          </a>
        </ActiveLink>
      ))}
    </BreadcrumbItems>
  );
};

export default Breadcrumb;

import Link from 'next/link';
import React, { Children } from 'react';

const ActiveLink = ({
  children,
  activeClassName,
  href,
  ...props
}: any) => {
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const className =
     href
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link href={href} {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;

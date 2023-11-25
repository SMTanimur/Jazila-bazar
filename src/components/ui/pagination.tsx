import RCPagination, { PaginationProps } from 'rc-pagination';
import React from 'react';
import 'rc-pagination/assets/index.css';

const Pagination: React.FC<PaginationProps> = (props) => {
  return <RCPagination nextIcon="next" prevIcon="previous" {...props} />;
};

export default Pagination;

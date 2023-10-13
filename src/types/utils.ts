import { TypeOf } from 'zod';


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

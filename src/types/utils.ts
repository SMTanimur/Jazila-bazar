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

export type IColor =
  | "rose"
  | "green"
  | "blue"
  | "yellow"
  | "red"
  | "gray"
  | "purple"
  | "indigo"
  | "pink"
  | "orange"
  | "teal"
  | "cyan"
  | "violet";

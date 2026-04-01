import React from "react";

export type ReactDispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export type VoidFunctionWithBooleanArg = (_args: boolean) => void;

export type DynamicObject = {
  [key: string]: string;
};

export interface PaginationRes {
  meta: IPagination;
}

export interface IPagination {
  total: number;
  page: string;
  limit: string;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationReq {
  limit: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

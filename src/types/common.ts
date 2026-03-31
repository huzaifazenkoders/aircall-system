import React from "react";

export type ReactDispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export type VoidFunctionWithBooleanArg = (_args: boolean) => void;

export type DynamicObject = {
  [key: string]: string;
};

export interface PaginationRes {
  pagination: IPagination;
}

export interface IPagination {
  lastPage: number;
  limit: number;
  nextPage: number | null;
  page: number;
  prevPage: number | null;
  total: number;
  totalPages: number;
}

export interface PaginationReq {
  limit: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

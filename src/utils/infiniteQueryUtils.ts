import { IPagination } from "@/types/common";
import { InfiniteData } from "@tanstack/react-query";

// -------------------[ Get next page utility utility function ]-------------------

type GetNextPageParamArgs = {
  data: {
    meta: IPagination;
  };
};

export function getNextPageParam(lastPage: GetNextPageParamArgs) {
  if (lastPage.data.meta?.hasNextPage) {
    return Number(lastPage.data.meta?.page) + 1;
  }
  return undefined;
}

// -------------------[ Transform infinite data utility function ]-------------------

type TransformInfiniteDataArgs<T, TKey extends string> = {
  data: {
    meta: IPagination;
  };
} & {
  data: {
    [K in TKey]: T[];
  };
};

export function transformInfiniteData<TData, TKey extends string>(
  data: InfiniteData<TransformInfiniteDataArgs<TData, TKey>> | undefined,
  key: TKey
) {
  return data?.pages.flatMap((each) => each.data?.[key]) ?? [];
}

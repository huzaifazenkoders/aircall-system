import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axios";
import { IPagination, PaginationReq } from "@/types/common";
import { getNextPageParam } from "@/utils/infiniteQueryUtils";
import { List, ListStatus, ListType } from "@/features/list/types/listTypes";

// ─── Get Lists ───────────────────────────────────────────────────────────────

interface GetListsReq extends PaginationReq {
  status?: ListStatus;
  list_type?: ListType;
}

interface GetListsRes {
  data: {
    data: List[];
    meta: IPagination;
  };
  message: string;
}

export function useGetLists({
  limit,
  search,
  status,
  list_type
}: GetListsReq) {
  return useInfiniteQuery({
    queryKey: ["lists", "list", { limit, search, status, list_type }],
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get("/lists/get-all", {
        params: {
          page: pageParam,
          limit,
          search,
          status,
          list_type
        }
      });
      return res.data as GetListsRes;
    },
    getNextPageParam,
    initialPageParam: 1
  });
}

// ─── Unassign List from Group ─────────────────────────────────────────────────

interface UnassignListReq {
  payload: {
    list_id: string;
    group_id: string;
  };
}

interface UnassignListRes {
  message: string;
}

export const useUnassignList = () =>
  useMutation({
    mutationFn: async ({ payload }: UnassignListReq) => {
      const res = await axiosInstance.patch("/lists/unassign-list", payload);
      return res.data as UnassignListRes;
    },
  });

// ─── Unassign List from User ─────────────────────────────────────────────────

interface UnassignUserListReq {
  payload: {
    list_id: string;
    user_id: string;
  };
}

export const useUnassignUserList = () =>
  useMutation({
    mutationFn: async ({ payload }: UnassignUserListReq) => {
      const res = await axiosInstance.patch("/lists/unassign-user", payload);
      return res.data as UnassignListRes;
    }
  });

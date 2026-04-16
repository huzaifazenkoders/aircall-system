import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axios";
import { IPagination, PaginationReq } from "@/types/common";
import { getNextPageParam } from "@/utils/infiniteQueryUtils";
import {
  AssignType,
  CallType,
  LeadActivityStatus,
  Lead,
  List,
  ListDetail,
  ListStatus,
  ListType,
  ListStats
} from "@/features/list/types/listTypes";
import { listKeys } from "@/features/list/query-keys";

// ─── Get Lists ────────────────────────────────────────────────────────────────

interface GetListsReq extends PaginationReq {
  status?: ListStatus;
  list_type: ListType;
  startDate?: string;
  endDate?: string;
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
  list_type,
  startDate,
  endDate
}: GetListsReq) {
  return useInfiniteQuery({
    queryKey: listKeys.list({
      limit,
      search,
      status,
      list_type,
      startDate,
      endDate
    }),
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get("/lists/get-all", {
        params: {
          page: pageParam,
          limit,
          search,
          status,
          list_type,
          startDate,
          endDate
        }
      });
      return res.data as GetListsRes;
    },
    getNextPageParam,
    initialPageParam: 1
  });
}

// ─── Get Leads ────────────────────────────────────────────────────────────────

interface GetLeadsReq extends PaginationReq {
  list_id: string;
  status?: LeadActivityStatus;
  startDate?: string;
  endDate?: string;
}

interface GetLeadsRes {
  data: {
    data: Lead[];
    meta: IPagination;
    lead_stats: ListStats;
  };
  message: string;
}

export function useGetLeads({
  page,
  limit,
  list_id,
  search,
  status,
  startDate,
  endDate
}: GetLeadsReq & { page: number }) {
  return useQuery({
    queryKey: listKeys.leads({
      page,
      limit,
      list_id,
      search,
      status,
      startDate,
      endDate
    }),
    queryFn: async () => {
      const res = await axiosInstance.get("/leads", {
        params: {
          page,
          limit,
          list_id,
          search,
          status,
          startDate,
          endDate
        }
      });
      return res.data as GetLeadsRes;
    },
    enabled: Boolean(list_id)
  });
}

// ─── Get List By ID ───────────────────────────────────────────────────────────

interface GetListByIdRes {
  data: ListDetail;
  message: string;
}

export const useGetListById = (id: string) =>
  useQuery({
    queryKey: listKeys.detail(id),
    queryFn: async () => {
      const res = await axiosInstance.get("/lists/detail", { params: { id } });
      return res.data as GetListByIdRes;
    },
    enabled: Boolean(id)
  });

// ─── Create List ──────────────────────────────────────────────────────────────

interface CreateListReq {
  payload: {
    name: string;
    description: string;
    cooldown_minimum_hours: number;
    cooldown_minimum_minutes: number;
    priority: number;
    call_type: CallType;
    assign_type: AssignType;
    list_type: ListType;
    workflow_id: string;
    group_ids: string[];
    user_ids: string[];
  };
}

interface CreateListRes {
  data: List;
  message: string;
}

interface UpdateListReq {
  payload: {
    id: string;
    name: string;
    description: string;
    cooldown_minimum_hours: number;
    cooldown_minimum_minutes: number;
    priority: number;
    call_type: CallType;
    assign_type: AssignType;
    list_type: ListType;
    workflow_id: string;
    group_ids: string[];
    user_ids: string[];
  };
}

export const useCreateList = () =>
  useMutation({
    mutationFn: async ({ payload }: CreateListReq) => {
      const res = await axiosInstance.post("/lists", payload);
      return res.data as CreateListRes;
    }
  });

export const useUpdateList = () =>
  useMutation({
    mutationFn: async ({ payload }: UpdateListReq) => {
      const res = await axiosInstance.put("/lists", payload);
      return res.data as CreateListRes;
    }
  });

// ─── Activate List ────────────────────────────────────────────────────────────

interface ToggleListStatusRes {
  data: List;
  message: string;
}

export const useActivateList = () =>
  useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await axiosInstance.patch("/lists/activate", undefined, {
        params: { id }
      });
      return res.data as ToggleListStatusRes;
    }
  });

// ─── Deactivate List ──────────────────────────────────────────────────────────

export const useDeactivateList = () =>
  useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await axiosInstance.patch("/lists/inactivate", undefined, {
        params: { id }
      });
      return res.data as ToggleListStatusRes;
    }
  });

// ─── Unassign List from Group ─────────────────────────────────────────────────

interface UnassignListReq {
  payload: {
    list_id: string;
    group_id?: string;
    user_id?: string;
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
    }
  });

// ─── Unassign List from User ──────────────────────────────────────────────────

interface UnassignUserListReq {
  payload: {
    list_id: string;
    user_id: string;
  };
}

export const useUnassignUserList = () =>
  useMutation({
    mutationFn: async ({ payload }: UnassignUserListReq) => {
      const res = await axiosInstance.patch("/lists/unassign-list", payload);
      return res.data as UnassignListRes;
    }
  });

// ─── Move Lead ────────────────────────────────────────────────────────────────

interface MoveLeadReq {
  payload: {
    lead_id: string;
    from_list_id: string;
    to_list_id: string;
  };
}

interface MoveLeadRes {
  message: string;
}

export const useMoveLead = () =>
  useMutation({
    mutationFn: async ({ payload }: MoveLeadReq) => {
      const res = await axiosInstance.patch("/leads/move", payload);
      return res.data as MoveLeadRes;
    }
  });

// ─── List Cleanup ─────────────────────────────────────────────────────────────

export type ListCleanupType = "one_time" | "recurring" | "now";
export type ListCleanupRecurrenceType = "weekly" | "monthly";
export type ListAssignType = "group" | "individual";

interface CreateListCleanupReq {
  payload: {
    list_id: string;
    cleanup_type: ListCleanupType;
    run_date?: string;
    run_time?: string;
    recurrence_type?: ListCleanupRecurrenceType;
    day_of_week?: number;
    week_of_month?: number;
    timezone?: string;
  };
}

interface CreateListCleanupRes {
  data: {
    id: string;
    next_run_at: string;
  };
  message: string;
}

export const useListCleanup = () =>
  useMutation({
    mutationFn: async ({ payload }: CreateListCleanupReq) => {
      const res = await axiosInstance.post("/list-cleanup", payload);
      return res.data as CreateListCleanupRes;
    }
  });

// ─── Assign List ──────────────────────────────────────────────────────────────

interface AssignListReq {
  payload: {
    list_id: string;
    assign_type: ListAssignType;
    group_ids: string[];
    user_ids: string[];
  };
}

interface AssignListRes {
  data: List;
  message: string;
}

export const useAssignList = () =>
  useMutation({
    mutationFn: async ({ payload }: AssignListReq) => {
      const res = await axiosInstance.patch("/lists/assign", payload);
      return res.data as AssignListRes;
    }
  });

// ─── Get My Lists (Infinite) ──────────────────────────────────────────────────

interface GetMyListsReq extends PaginationReq {
  search?: string;
}

export interface MyList {
  id: string;
  name: string;
  priority: number;
  total_leads: number;
  assigned_diallers: number;
  user_priorities: {
    is_active: boolean;
  }[];
}

interface GetMyListsRes {
  data: {
    data: MyList[];
    meta: IPagination;
  };
  message: string;
}

export function useGetMyLists({ limit, search }: GetMyListsReq) {
  return useInfiniteQuery({
    queryKey: listKeys.myLists({ limit, search }),
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get("/lists/my-lists", {
        params: { page: pageParam, limit, search }
      });
      return res.data as GetMyListsRes;
    },
    getNextPageParam,
    initialPageParam: 1
  });
}

// ─── Activate / Deactivate My List ────────────────────────────────────────────

interface ToggleMyListReq {
  payload: {
    list_id: string;
  };
}

interface ToggleMyListRes {
  data: MyList;
  message: string;
}

export const useActivateMyList = () =>
  useMutation({
    mutationFn: async ({ payload }: ToggleMyListReq) => {
      const res = await axiosInstance.patch(
        "/lists/my-lists/activate",
        payload
      );
      return res.data as ToggleMyListRes;
    }
  });

export const useDeactivateMyList = () =>
  useMutation({
    mutationFn: async ({ payload }: ToggleMyListReq) => {
      const res = await axiosInstance.patch(
        "/lists/my-lists/inactivate",
        payload
      );
      return res.data as ToggleMyListRes;
    }
  });

// ─── User List Priority Status ────────────────────────────────────────────────

interface UserListPriorityStatusRes {
  data: {
    exists: boolean;
    isActive: boolean;
  };
  message: string;
}

export const useGetUserListPriorityStatus = (list_id: string) =>
  useQuery({
    queryKey: listKeys.myListPriorityStatus(list_id),
    queryFn: async () => {
      const res = await axiosInstance.get("/user-list-priority/my-status", {
        params: { list_id }
      });
      return res.data as UserListPriorityStatusRes;
    },
    enabled: Boolean(list_id)
  });

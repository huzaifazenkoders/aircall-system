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
  ListType
} from "@/features/list/types/listTypes";
import { listKeys } from "@/features/list/query-keys";

// ─── Get Lists ────────────────────────────────────────────────────────────────

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
    queryKey: listKeys.list({ limit, search, status, list_type }),
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get("/lists/get-all", {
        params: { page: pageParam, limit, search, status, list_type }
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

export const useCreateList = () =>
  useMutation({
    mutationFn: async ({ payload }: CreateListReq) => {
      const res = await axiosInstance.post("/lists", payload);
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
      const res = await axiosInstance.patch("/lists/activate", null, {
        params: { id }
      });
      return res.data as ToggleListStatusRes;
    }
  });

// ─── Deactivate List ──────────────────────────────────────────────────────────

export const useDeactivateList = () =>
  useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await axiosInstance.patch("/lists/deactivate", null, {
        params: { id }
      });
      return res.data as ToggleListStatusRes;
    }
  });

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
      const res = await axiosInstance.patch("/lists/unassign-user", payload);
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

export type ListCleanupType = "one_time" | "recurring";
export type ListCleanupRecurrenceType = "weekly" | "monthly";

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

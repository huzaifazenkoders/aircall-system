import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axios";
import { IPagination, PaginationReq } from "@/types/common";
import { authKeys } from "@/features/auth/query-keys";
import { Me, User, UserDetail, UserRole, UserStatus } from "../types/userTypes";
import { userKeys } from "../query-keys";

// ─── Me ───────────────────────────────────────────────────────────────────────

interface MeRes {
  data: Me;
}

export const useMe = () =>
  useQuery({
    queryKey: authKeys.me,
    queryFn: async () => {
      const res = await axiosInstance.get("/users/me");
      return res.data as MeRes;
    }
  });

// ─── Get Paginated Users ──────────────────────────────────────────────────────

interface GetUsersReq extends PaginationReq {
  role?: UserRole;
  status?: UserStatus;
}

interface GetUsersRes {
  data: {
    data: User[];
    meta: IPagination;
  };
  message: string;
}

export function useGetUsers({
  limit,
  search,
  sortBy,
  sortOrder,
  role,
  status
}: GetUsersReq) {
  return useInfiniteQuery({
    queryKey: userKeys.list({ limit, search, sortBy, sortOrder, role, status }),
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get("/users", {
        params: {
          page: pageParam,
          limit,
          search,
          sortBy,
          sortOrder,
          role,
          status
        }
      });
      return res.data as GetUsersRes;
    },
    getNextPageParam: (lastPage: GetUsersRes) =>
      lastPage.data?.meta?.hasNextPage
        ? Number(lastPage.data?.meta.page) + 1
        : undefined,
    initialPageParam: 1
  });
}

// ─── Get User By ID ───────────────────────────────────────────────────────────

interface GetUserByIdRes {
  data: UserDetail;
}

export const useGetUserById = (id: string) =>
  useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const res = await axiosInstance.get("/users/get-details", {
        params: { id }
      });
      return res.data as GetUserByIdRes;
    },
    enabled: Boolean(id)
  });

// ─── Invite User ──────────────────────────────────────────────────────────────

interface InviteUserReq {
  payload: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    keap_id: string;
    group_ids: string[];
    list: {
      description: string;
      call_type: "hot_lead";
      cooldown_minimum_hours: number;
      cooldown_minimum_minutes: number;
      workflow_id: string;
    };
  };
}

interface InviteUserRes {
  data: User;
  message: string;
}

export const useInviteUser = () =>
  useMutation({
    mutationFn: async ({ payload }: InviteUserReq) => {
      const res = await axiosInstance.post("/users/invite", payload);
      return res.data as InviteUserRes;
    }
  });

// ─── Update User ─────────────────────────────────────────────────────────────

interface UpdateUserReq {
  payload: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
  };
}

interface UpdateUserRes {
  data: User;
  message: string;
}

export const useUpdateUser = () =>
  useMutation({
    mutationFn: async ({ payload }: UpdateUserReq) => {
      const res = await axiosInstance.patch("/users", payload);
      return res.data as UpdateUserRes;
    }
  });

// ─── Deactivate / Activate User ──────────────────────────────────────────────

interface ToggleUserStatusReq {
  payload: {
    id: string;
  };
}

interface ToggleUserStatusRes {
  data: User;
  message: string;
}

interface AddListsToUserReq {
  payload: {
    user_id: string;
    list_ids: string[];
  };
}

interface AddListsToUserRes {
  data: User;
  message: string;
}

export const useDeactivateUser = () =>
  useMutation({
    mutationFn: async ({ payload }: ToggleUserStatusReq) => {
      const res = await axiosInstance.patch("/users/inactive", payload);
      return res.data as ToggleUserStatusRes;
    }
  });

export const useActivateUser = () =>
  useMutation({
    mutationFn: async ({ payload }: ToggleUserStatusReq) => {
      const res = await axiosInstance.patch("/users/active", payload);
      return res.data as ToggleUserStatusRes;
    }
  });

export const useAddListsToUser = () =>
  useMutation({
    mutationFn: async ({ payload }: AddListsToUserReq) => {
      const res = await axiosInstance.post("/users/add-lists", payload);
      return res.data as AddListsToUserRes;
    }
  });

// ─── Toggle Availability ────────────────────────────────────────────────────────────

interface ToggleAvailabilityRes {
  data: Me;
  message: string;
}

export const useToggleAvailability = () =>
  useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.patch("/users/toggle-availability");
      return res.data as ToggleAvailabilityRes;
    }
  });

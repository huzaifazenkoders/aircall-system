import { axiosInstance } from "@/services/axios";
import { IPagination, PaginationReq } from "@/types/common";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { groupKeys } from "../query-keys";
import { Group, GroupInfo } from "../types/groupTypes";

// ─── Get Paginated Groups ─────────────────────────────────────────────────────

interface GetGroupsReq extends PaginationReq {
  is_active?: boolean;
  from?: string;
  to?: string;
}

interface GetGroupsRes {
  data: {
    data: Group[];
    meta: IPagination;
  };
  success: boolean;
}

export function useGetGroups({
  limit,
  search,
  sortBy,
  sortOrder,
  is_active,
  from,
  to
}: GetGroupsReq) {
  return useInfiniteQuery({
    queryKey: groupKeys.list({
      limit,
      search,
      sortBy,
      sortOrder,
      is_active,
      from,
      to
    }),
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get("/groups", {
        params: {
          page: pageParam,
          limit,
          search,
          sortBy,
          sortOrder,
          is_active,
          from,
          to
        }
      });
      return res.data as GetGroupsRes;
    },
    getNextPageParam: (lastPage: GetGroupsRes) =>
      lastPage.data?.meta?.hasNextPage
        ? Number(lastPage.data?.meta.page) + 1
        : undefined,
    initialPageParam: 1
  });
}

// ─── Create Group ─────────────────────────────────────────────────────────────

interface CreateGroupReq {
  payload: {
    name: string;
    description: string;
    is_active: boolean;
    user_ids: string[];
  };
}

interface CreateGroupRes {
  data: Group;
  message: string;
}

export const useCreateGroup = () =>
  useMutation({
    mutationFn: async ({ payload }: CreateGroupReq) => {
      const res = await axiosInstance.post("/groups", payload);
      return res.data as CreateGroupRes;
    }
  });

// ─── Get Group Info with Users ────────────────────────────────────────────────

interface GetGroupInfoRes {
  data: GroupInfo;
  success: boolean;
}

export const useGetGroupInfo = (id: string) =>
  useQuery({
    queryKey: groupKeys.info(id),
    queryFn: async () => {
      const res = await axiosInstance.get("/groups/info", { params: { id } });
      return res.data as GetGroupInfoRes;
    },
    enabled: Boolean(id)
  });

// ─── Update Group Active Status ───────────────────────────────────────────────

interface UpdateGroupStatusReq {
  payload: { id: string };
}

interface UpdateGroupStatusRes {
  data: Group;
  message: string;
}

export const useUpdateGroupStatus = () =>
  useMutation({
    mutationFn: async ({ payload }: UpdateGroupStatusReq) => {
      const res = await axiosInstance.patch("/groups/inactive-group", payload);
      return res.data as UpdateGroupStatusRes;
    }
  });

// ─── Remove User from Group ───────────────────────────────────────────────────

interface RemoveUserFromGroupReq {
  group_id: string;
  user_id: string;
}

interface RemoveUserFromGroupRes {
  message: string;
}

export const useRemoveUserFromGroup = () =>
  useMutation({
    mutationFn: async ({ group_id, user_id }: RemoveUserFromGroupReq) => {
      const res = await axiosInstance.delete("/groups/remove-user", {
        params: { group_id, user_id }
      });
      return res.data as RemoveUserFromGroupRes;
    }
  });

// ─── Add Groups to User ──────────────────────────────────────────────────────

interface AddGroupsToUserReq {
  payload: {
    id: string;
    group_ids: string[];
  };
}

interface AddGroupsToUserRes {
  message: string;
}

export const useAddGroupsToUser = () =>
  useMutation({
    mutationFn: async ({ payload }: AddGroupsToUserReq) => {
      const res = await axiosInstance.post("/users/add-groups", payload);
      return res.data as AddGroupsToUserRes;
    }
  });

// ─── Add Users to Group ───────────────────────────────────────────────────────

interface AddUsersToGroupReq {
  payload: {
    id: string;
    user_ids: string[];
  };
}

interface AddUsersToGroupRes {
  data: Group;
  message: string;
}

export const useAddUsersToGroup = () =>
  useMutation({
    mutationFn: async ({ payload }: AddUsersToGroupReq) => {
      const res = await axiosInstance.post("/groups/add-users", payload);
      return res.data as AddUsersToGroupRes;
    }
  });

// ─── Activate Group ──────────────────────────────────────────────────────────

export const useActivateGroup = () =>
  useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await axiosInstance.patch("/groups/activate-group", null, {
        params: { id }
      });
      return res.data as UpdateGroupStatusRes;
    }
  });

// ─── Update Group ─────────────────────────────────────────────────────────────

interface UpdateGroupReq {
  payload: {
    id: string;
    name: string;
    description: string;
  };
}

export const useUpdateGroup = () =>
  useMutation({
    mutationFn: async ({ payload }: UpdateGroupReq) => {
      const res = await axiosInstance.patch("/groups", payload);
      return res.data as CreateGroupRes;
    }
  });

// ─── Add Lists to Group ───────────────────────────────────────────────────────

interface AddListsToGroupReq {
  payload: {
    group_id: string;
    list_ids: string[];
  };
}

interface AddListsToGroupRes {
  message: string;
}

export const useAddListsToGroup = () =>
  useMutation({
    mutationFn: async ({ payload }: AddListsToGroupReq) => {
      const res = await axiosInstance.post("/groups/add-lists", payload);
      return res.data as AddListsToGroupRes;
    }
  });

// ─── Delete Group ─────────────────────────────────────────────────────────────

interface DeleteGroupReq {
  id: string;
}

interface DeleteGroupRes {
  message: string;
}

export const useDeleteGroup = () =>
  useMutation({
    mutationFn: async ({ id }: DeleteGroupReq) => {
      const res = await axiosInstance.delete("/groups", { params: { id } });
      return res.data as DeleteGroupRes;
    }
  });

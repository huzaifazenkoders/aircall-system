import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axios";
import { PaginationReq, PaginationRes } from "@/types/common";
import { getNextPageParam } from "@/utils/infiniteQueryUtils";
import { workflowKeys } from "../query-keys";
import { Workflow, WorkflowStatus } from "../types/workflowTypes";

// ─── Get Paginated Workflows ──────────────────────────────────────────────────

interface GetWorkflowsReq extends PaginationReq {
  status?: WorkflowStatus;
}

interface GetWorkflowsRes {
  data: { data: Workflow[] } & PaginationRes;
  statusCode: number;
  success: boolean;
}

export function useGetWorkflows({
  limit,
  sortBy,
  sortOrder,
  search,
  status
}: GetWorkflowsReq) {
  return useInfiniteQuery({
    queryKey: workflowKeys.list({ limit, sortBy, sortOrder, search, status }),
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get("/workflows", {
        params: { page: pageParam, limit, sortBy, sortOrder, search, status }
      });
      return res.data as GetWorkflowsRes;
    },
    getNextPageParam,
    initialPageParam: 1
  });
}

// ─── Create Workflow ──────────────────────────────────────────────────────────

interface CreateWorkflowReq {
  payload: {
    name: string;
    description: string;
    status: "draft";
  };
}

interface CreateWorkflowRes {
  data: Workflow;
  message: string;
}

export const useCreateWorkflow = () =>
  useMutation({
    mutationFn: async ({ payload }: CreateWorkflowReq) => {
      const res = await axiosInstance.post("/workflows", payload);
      return res.data as CreateWorkflowRes;
    }
  });

// ─── Publish / Draft Workflow ─────────────────────────────────────────────────

interface UpdateWorkflowStatusReq {
  payload: {
    id: string;
    status: WorkflowStatus;
  };
}

interface UpdateWorkflowStatusRes {
  data: Workflow;
  message: string;
}

export const useUpdateWorkflowStatus = () =>
  useMutation({
    mutationFn: async ({ payload }: UpdateWorkflowStatusReq) => {
      const res = await axiosInstance.patch("/workflows/status", payload);
      return res.data as UpdateWorkflowStatusRes;
    }
  });

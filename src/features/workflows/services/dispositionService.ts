import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axios";
import { PaginationReq, PaginationRes } from "@/types/common";
import { getNextPageParam } from "@/utils/infiniteQueryUtils";
import { workflowKeys } from "../query-keys";
import {
  CooldownBehavior,
  Disposition,
  DispositionType,
  ExistingDispositionType,
  MaxAttemptReached,
  RemainingDispositionType,
  ResultingLeadStatus
} from "../types/workflowTypes";
import { WorkflowStatus } from "../data/workflowsData";

// ─── Get Paginated Dispositions ───────────────────────────────────────────────

interface GetDispositionsReq extends PaginationReq {
  workflow_id: string;
}

interface GetDispositionsRes {
  data: {
    dispositions: Disposition[];
    description: string;
    is_default: boolean;
    name: string;
    status: WorkflowStatus;
  } & PaginationRes;
}

export function useGetDispositions({
  workflow_id,
  limit,
  sortBy,
  sortOrder,
  search
}: GetDispositionsReq) {
  return useInfiniteQuery({
    queryKey: workflowKeys.dispositions({
      workflow_id,
      limit,
      sortBy,
      sortOrder,
      search
    }),
    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get("/workflow-dispositions", {
        params: {
          page: pageParam,
          limit,
          sortBy,
          sortOrder,
          search,
          workflow_id
        }
      });
      return res.data as GetDispositionsRes;
    },
    getNextPageParam,
    initialPageParam: 1
  });
}

// ─── Shared Disposition Payload ───────────────────────────────────────────────

interface DispositionPayloadBase {
  workflow_id: string;
  disposition_type: DispositionType;
  resulting_lead_status: ResultingLeadStatus;
  max_attempts: number;
  cooldown_behavior: CooldownBehavior;
  custom_cooldown_hours: number;
  custom_cooldown_min: number;
  max_attempt_reached: MaxAttemptReached;
  keap_note: string;
  is_retry_allowed: boolean;
}

interface DispositionRes {
  data: Disposition;
  message: string;
}

// ─── Create Disposition ───────────────────────────────────────────────────────

interface CreateDispositionReq {
  payload: DispositionPayloadBase;
}

export const useCreateDisposition = () =>
  useMutation({
    mutationFn: async ({ payload }: CreateDispositionReq) => {
      const res = await axiosInstance.post("/workflow-dispositions", payload);
      return res.data as DispositionRes;
    }
  });

// ─── Update Disposition ───────────────────────────────────────────────────────

interface UpdateDispositionReq {
  payload: DispositionPayloadBase & { id: string };
}

export const useUpdateDisposition = () =>
  useMutation({
    mutationFn: async ({ payload }: UpdateDispositionReq) => {
      const res = await axiosInstance.patch("/workflow-dispositions", payload);
      return res.data as DispositionRes;
    }
  });

// ─── Get Remaining Disposition Types ─────────────────────────────────────────

interface GetRemainingDispositionTypesReq {
  id: string;
}

interface GetRemainingDispositionTypesRes {
  data: string[];
  statusCode: number;
  success: boolean;
}

export const useGetRemainingDispositionTypes = ({
  id
}: GetRemainingDispositionTypesReq) =>
  useQuery({
    queryKey: workflowKeys.remainingDispositionTypes(id),
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/workflow-dispositions/get-remaining-disposition-type",
        { params: { id } }
      );
      return res.data as GetRemainingDispositionTypesRes;
    },
    enabled: Boolean(id)
  });

// ─── Get Existing Disposition Types ──────────────────────────────────────────

interface GetExistingDispositionTypesReq {
  id: string;
}

interface GetExistingDispositionTypesRes {
  data: ExistingDispositionType[];
}

export const useGetExistingDispositionTypes = ({
  id
}: GetExistingDispositionTypesReq) =>
  useQuery({
    queryKey: workflowKeys.existingDispositionTypes(id),
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/workflow-dispositions/get-existing-disposition-type",
        { params: { id } }
      );
      return res.data as GetExistingDispositionTypesRes;
    },
    enabled: Boolean(id)
  });

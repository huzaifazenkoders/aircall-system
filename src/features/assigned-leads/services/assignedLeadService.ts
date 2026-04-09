import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axios";
import { assignedLeadKeys } from "@/features/assigned-leads/query-keys";
import { CurrentLead } from "@/features/assigned-leads/types/assignedLeadTypes";
import { CallStatus } from "@/features/call-logs/types/callLogTypes";

// ─── Fetch Current Lead ───────────────────────────────────────────────────────

interface GetCurrentLeadRes {
  data: CurrentLead | null;
  message: string;
}

export function useGetCurrentLead() {
  return useQuery({
    queryKey: assignedLeadKeys.currentLead,
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/lead-activities/fetch-current-lead"
      );
      return res.data as GetCurrentLeadRes;
    }
  });
}

// ─── Fetch Workflow Dispositions ──────────────────────────────────────────────

export interface WorkflowDisposition {
  id: string;
  name: string;
}

interface GetWorkflowDispositionsRes {
  data: WorkflowDisposition[];
  message: string;
}

export function useGetWorkflowDispositions(workflowId: string) {
  return useQuery({
    queryKey: ["workflow-dispositions", workflowId],
    queryFn: async () => {
      const res = await axiosInstance.get("/workflow-dispositions", {
        params: { workflow_id: workflowId }
      });
      return res.data as GetWorkflowDispositionsRes;
    }
  });
}

// ─── Create Call Log ──────────────────────────────────────────────────────────

interface CreateCallLogReq {
  payload: {
    lead_id: string;
    list_id: string;
    disposition_id: string;
    notes: string;
    attempt_number: number;
    call_status: CallStatus;
  };
}

interface CreateCallLogRes {
  data: { id: string };
  message: string;
}

export function useCreateCallLog() {
  return useMutation({
    mutationFn: async ({ payload }: CreateCallLogReq) => {
      const res = await axiosInstance.post("/call-logs", payload);
      return res.data as CreateCallLogRes;
    }
  });
}

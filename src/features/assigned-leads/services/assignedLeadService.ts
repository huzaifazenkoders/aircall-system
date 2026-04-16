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
  disposition_type: string;
}

interface GetWorkflowDispositionsRes {
  data: { dispositions: WorkflowDisposition[] };
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

// ─── Start Call ──────────────────────────────────────────────────────────────

export function useStartCall() {
  return useMutation({
    mutationFn: async (lead_activity_id: string) => {
      const res = await axiosInstance.post("/lead-activities/start-call", {
        lead_activity_id
      });
      return res.data;
    }
  });
}

// ─── Create Call Log ──────────────────────────────────────────────────────────

interface CreateCallLogReq {
  payload: {
    lead_activity_id: string;
    disposition_id: string;
    scheduled_call_at?: string;
    call_status: string;
    notes: string;
  };
}

interface CreateCallLogRes {
  data: { id: string };
  message: string;
}

export function useCreateCallLog() {
  return useMutation({
    mutationFn: async ({ payload }: CreateCallLogReq) => {
      const res = await axiosInstance.post(
        "/lead-activities/call-outcome",
        payload
      );
      return res.data as CreateCallLogRes;
    }
  });
}

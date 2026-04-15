import { dialerKeys } from "@/features/dialer/query-keys";
import {
  CallHistory,
  CallHistoryDetails,
  LeadActivity,
  LeadActivityDetail,
  LeadActivityStatus,
  MyCallLogDetail,
  MyCallStatus
} from "@/features/dialer/types/leadActivityTypes";
import { axiosInstance } from "@/services/axios";
import { IPagination } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

// ─── Get Scheduled / Cooldown Activities ─────────────────────────────────────

interface GetScheduledCooldownReq {
  page: number;
  limit: number;
  status?: LeadActivityStatus;
}

interface GetScheduledCooldownRes {
  data: {
    data: LeadActivity[];
    meta: IPagination;
  };
  message: string;
}

export function useGetScheduledCooldown({
  page,
  limit,
  status
}: GetScheduledCooldownReq) {
  return useQuery({
    queryKey: dialerKeys.scheduledCooldown({ page, limit, status }),
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/lead-activities/scheduled-cooldown",
        {
          params: { page, limit, status }
        }
      );
      return res.data as GetScheduledCooldownRes;
    }
  });
}

// ─── Get Lead Activity Detail ─────────────────────────────────────────────────

interface GetLeadActivityDetailRes {
  data: LeadActivityDetail;
  message: string;
}

export function useGetLeadActivityDetail(id: string) {
  return useQuery({
    queryKey: dialerKeys.activityDetail(id),
    queryFn: async () => {
      const res = await axiosInstance.get("/lead-activities/detail", {
        params: { id }
      });
      return res.data as GetLeadActivityDetailRes;
    },
    enabled: Boolean(id)
  });
}

// ─── Get My Paginated Call Logs ───────────────────────────────────────────────

interface GetMyCallLogsReq {
  page: number;
  limit: number;
  lead_id?: string;
  list_id?: string;
  assigned_to?: string;
  call_status?: MyCallStatus;
}

interface GetMyCallLogsRes {
  data: {
    data: CallHistory[];
    meta: IPagination;
    my_stats: {
      total_calls: number;
      calls_today: number;
      connected_positive: number;
      no_answer: number;
      callback_scheduled: number;
    };
  };
  message: string;
}

export function useGetMyCallLogs({
  page,
  limit,
  lead_id,
  list_id,
  assigned_to,
  call_status
}: GetMyCallLogsReq) {
  return useQuery({
    queryKey: dialerKeys.myLogs({
      page,
      limit,
      lead_id,
      list_id,
      assigned_to,
      call_status
    }),
    queryFn: async () => {
      const res = await axiosInstance.get("/call-logs/my-logs", {
        params: { page, limit, lead_id, list_id, assigned_to, call_status }
      });
      return res.data as GetMyCallLogsRes;
    }
  });
}

// ─── Get My Call Log Detail ───────────────────────────────────────────────────

interface GetMyCallLogDetailRes {
  data: CallHistoryDetails;
  message: string;
}

export function useGetMyCallLogDetail(id: string) {
  return useQuery({
    queryKey: dialerKeys.myLogDetail(id),
    queryFn: async () => {
      const res = await axiosInstance.get("/call-logs/my-logs/detail", {
        params: { id }
      });
      return res.data as GetMyCallLogDetailRes;
    }
  });
}

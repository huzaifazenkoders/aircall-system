import { axiosInstance } from "@/services/axios";
import { IPagination } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { callLogKeys } from "../query-keys";
import { CallLog, CallLogDetail, CallStatus } from "../types/callLogTypes";

// ─── Get Paginated Call Logs ──────────────────────────────────────────────────

interface GetCallLogsReq {
  page: number;
  limit: number;
  lead_id?: string;
  list_id?: string;
  assigned_to?: string;
  call_status?: CallStatus;
  startDate?: string;
  endDate?: string;
}

interface GetCallLogsRes {
  data: {
    data: CallLog[];
    meta: IPagination;
  };
  message: string;
}

export function useGetCallLogs({
  page,
  limit,
  lead_id,
  list_id,
  assigned_to,
  call_status,
  startDate,
  endDate
}: GetCallLogsReq) {
  return useQuery({
    queryKey: callLogKeys.list({
      page,
      limit,
      lead_id,
      list_id,
      assigned_to,
      call_status,
      startDate,
      endDate
    }),
    queryFn: async () => {
      const res = await axiosInstance.get("/call-logs", {
        params: { page, limit, lead_id, list_id, assigned_to, call_status, startDate, endDate }
      });
      return res.data as GetCallLogsRes;
    }
  });
}

// ─── Get Call Log By ID ───────────────────────────────────────────────────────

interface GetCallLogByIdRes {
  data: CallLogDetail;
  message: string;
}

export function useGetCallLogById(id: string) {
  return useQuery({
    queryKey: callLogKeys.detail(id),
    queryFn: async () => {
      const res = await axiosInstance.get("/call-logs/detail", {
        params: { id }
      });
      return res.data as GetCallLogByIdRes;
    },
    enabled: Boolean(id)
  });
}

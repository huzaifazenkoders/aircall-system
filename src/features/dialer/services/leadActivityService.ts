import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axios";
import { IPagination } from "@/types/common";
import { dialerKeys } from "@/features/dialer/query-keys";
import { LeadActivity, LeadActivityDetail, LeadActivityStatus } from "@/features/dialer/types/leadActivityTypes";

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

export function useGetScheduledCooldown({ page, limit, status }: GetScheduledCooldownReq) {
  return useQuery({
    queryKey: dialerKeys.scheduledCooldown({ page, limit, status }),
    queryFn: async () => {
      const res = await axiosInstance.get("/lead-activities/scheduled-cooldown", {
        params: { page, limit, status },
      });
      return res.data as GetScheduledCooldownRes;
    },
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
        params: { id },
      });
      return res.data as GetLeadActivityDetailRes;
    },
    enabled: Boolean(id),
  });
}

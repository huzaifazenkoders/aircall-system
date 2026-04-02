import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axios";

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
    },
  });

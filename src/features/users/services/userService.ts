import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/axios";
import { authKeys } from "@/features/auth/query-keys";
import { Me } from "../types/userTypes";

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

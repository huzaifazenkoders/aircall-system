import { axiosInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { AuthUser } from "../types/authTypes";

// ─── Login ───────────────────────────────────────────────────────────────────

interface LoginReq {
  payload: {
    email: string;
    password: string;
  };
}

interface LoginRes {
  data: {
    token: string;
    has_reset_password: boolean;
    user: AuthUser;
  };
  message: string;
}

export const useLogin = () =>
  useMutation({
    mutationFn: async ({ payload }: LoginReq) => {
      const res = await axiosInstance.post("/auth/login", payload);
      return res.data as LoginRes;
    }
  });

// ─── Forgot Password ─────────────────────────────────────────────────────────

interface ForgotPasswordReq {
  payload: {
    email: string;
  };
}

interface ForgotPasswordRes {
  message: string;
}

export const useForgotPassword = () =>
  useMutation({
    mutationFn: async ({ payload }: ForgotPasswordReq) => {
      const res = await axiosInstance.post("/auth/forgot-password", payload);
      return res.data as ForgotPasswordRes;
    }
  });

// ─── Verify OTP ──────────────────────────────────────────────────────────────

interface VerifyOtpReq {
  payload: {
    email: string;
    code: string;
  };
}

interface VerifyOtpRes {
  data: {
    reset_token: string;
  };
  message: string;
}

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: async ({ payload }: VerifyOtpReq) => {
      const res = await axiosInstance.post("/auth/verify-otp", payload);
      return res.data as VerifyOtpRes;
    }
  });

// ─── Resend OTP ──────────────────────────────────────────────────────────────

interface ResendOtpReq {
  payload: {
    email: string;
  };
}

interface ResendOtpRes {
  message: string;
}

export const useResendOtp = () =>
  useMutation({
    mutationFn: async ({ payload }: ResendOtpReq) => {
      const res = await axiosInstance.post("/auth/resend-otp", payload);
      return res.data as ResendOtpRes;
    }
  });

// ─── Reset Password ──────────────────────────────────────────────────────────

interface ResetPasswordReq {
  payload: {
    reset_token: string;
    new_password: string;
  };
}

interface ResetPasswordRes {
  message: string;
}

export const useResetPassword = () =>
  useMutation({
    mutationFn: async ({ payload }: ResetPasswordReq) => {
      const res = await axiosInstance.post("/auth/reset-password", payload);
      return res.data as ResetPasswordRes;
    }
  });

// ─── Change Password (Authenticated) ──────────────────────────────────────────────────────────

interface ChangePasswordReq {
  payload: {
    new_password: string;
  };
}

interface ChangePasswordRes {
  message: string;
}

export const useChangePassword = () =>
  useMutation({
    mutationFn: async ({ payload }: ChangePasswordReq) => {
      const res = await axiosInstance.post("/auth/change-password", payload);
      return res.data as ChangePasswordRes;
    }
  });

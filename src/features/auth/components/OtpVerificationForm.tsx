"use client";

import React from "react";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import OtpInput from "@/components/ui/otp-input.component";
import { authStyles } from "@/features/auth/styles/authStyles";
import { handleMutationError } from "@/utils/handleMutationError";
import { useResendOtp, useVerifyOtp } from "../services/authService";

const validationSchema = Yup.object({
  code: Yup.string()
    .trim()
    .length(6, "Code must be 6 digits")
    .required("Code is required")
});

const OtpVerificationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const { mutate: verifyOtp, isPending } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const [countdown, setCountdown] = React.useState(60);

  React.useEffect(() => {
    if (countdown === 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const formik = useFormik({
    initialValues: { code: "" },
    validationSchema,
    onSubmit: (values) => {
      verifyOtp(
        { payload: { email, code: values.code.trim() } },
        {
          onSuccess: ({ data }) => {
            toast.success("OTP verified");
            router.replace(
              `/auth/reset-password?reset_token=${encodeURIComponent(data.reset_token)}`
            );
          },
          onError: handleMutationError
        }
      );
    }
  });

  const handleResend = () => {
    resendOtp(
      { payload: { email } },
      {
        onSuccess: () => {
          toast.success("OTP resent");
          setCountdown(60);
        },
        onError: handleMutationError
      }
    );
  };

  return (
    <form className={authStyles.formRoot} onSubmit={formik.handleSubmit}>
      <div className={authStyles.formSection}>
        <div className={authStyles.titleBlock}>
          <h1 className={authStyles.title}>Verify code</h1>
          <p className={authStyles.otpIntro}>
            We&apos;ve sent a 6-digit code to{" "}
            <span className={authStyles.otpStrong}>{email}</span>. Enter it
            below to verify your email and continue.
          </p>
        </div>

        <div className={authStyles.otpActions}>
          <OtpInput
            value={formik.values.code}
            setValue={(val) => formik.setFieldValue("code", val)}
            error={
              formik.touched.code && formik.errors.code
                ? formik.errors.code
                : undefined
            }
          />

          <Button
            type="submit"
            size="xl"
            className={authStyles.ctaButton}
            disabled={isPending}
          >
            {isPending ? "Verifying..." : "Verify"}
          </Button>

          <p className={authStyles.otpFooter}>
            Didn&apos;t receive a code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || countdown > 0}
              className={authStyles.otpResend}
            >
              {isResending
                ? "Resending..."
                : countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Resend"}
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default OtpVerificationForm;

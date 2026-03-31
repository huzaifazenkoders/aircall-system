"use client";

import React from "react";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import OtpInput from "@/components/ui/otp-input.component";
import { authStyles } from "@/features/auth/styles/authStyles";
import { useVerifyOtp, useResendOtp } from "../services/authService";
import { handleMutationError } from "@/utils/handleMutationError";

const validationSchema = Yup.object({
  code: Yup.string()
    .length(6, "Code must be 6 digits")
    .required("Code is required")
});

const OtpVerificationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const { mutate: verifyOtp, isPending } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const formik = useFormik({
    initialValues: { code: "" },
    validationSchema,
    onSubmit: (values) => {
      verifyOtp(
        { payload: { email, code: values.code } },
        {
          onSuccess: (data) => {
            toast.success("OTP verified");
            router.push(
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
        onSuccess: () => toast.success("OTP resent"),
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
            error={formik.touched.code ? formik.errors.code : undefined}
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
              disabled={isResending}
              className={authStyles.otpResend}
            >
              {isResending ? "Resending..." : "Resend"}
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default OtpVerificationForm;

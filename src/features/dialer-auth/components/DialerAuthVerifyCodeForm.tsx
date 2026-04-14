"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import OtpInput from "@/components/ui/otp-input.component";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";
import {
  useVerifyOtp,
  useResendOtp
} from "@/features/auth/services/authService";
import { handleMutationError } from "@/utils/handleMutationError";

const validationSchema = Yup.object({
  code: Yup.string()
    .trim()
    .length(6, "Code must be exactly 6 digits")
    .matches(/^\d{6}$/, "Code must contain only digits")
    .required("Code is required")
});

const DialerAuthVerifyCodeForm = () => {
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
        { payload: { email, code: values.code.trim() } },
        {
          onSuccess: ({ data }) => {
            toast.success("OTP verified");
            router.replace(
              `/dialer-auth/reset-password?reset_token=${encodeURIComponent(data.reset_token)}`
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
    <form className={dialerAuthStyles.formRoot} onSubmit={formik.handleSubmit}>
      <div className={dialerAuthStyles.formSection}>
        <div className={dialerAuthStyles.titleBlock}>
          <h1 className={dialerAuthStyles.title}>Verify code</h1>
          <p className={dialerAuthStyles.otpIntro}>
            We&apos;ve sent a 6-digit code to{" "}
            <span className={dialerAuthStyles.otpStrong}>{email}</span>. Enter
            it below to verify your email and continue.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <OtpInput
            value={formik.values.code}
            setValue={(val) => formik.setFieldValue("code", val)}
            error={
              formik.touched.code && formik.errors.code
                ? formik.errors.code
                : undefined
            }
          />

          <Button type="submit" size="xl" disabled={isPending}>
            {isPending ? "Verifying..." : "Verify"}
          </Button>

          <p className={dialerAuthStyles.otpFooter}>
            Didn&apos;t receive a code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className={dialerAuthStyles.otpFooterLink}
            >
              {isResending ? "Resending..." : "Resend"}
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default DialerAuthVerifyCodeForm;

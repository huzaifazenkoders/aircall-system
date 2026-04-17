"use client";

import React from "react";
import { LockKeyhole } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { authStyles } from "@/features/auth/styles/authStyles";
import { useResetPassword } from "../services/authService";
import { handleMutationError } from "@/utils/handleMutationError";

const validationSchema = Yup.object({
  new_password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Please confirm your password")
});

const ResetPasswordForm = ({
  title = "Reset password",
  subtitle = "Create a new password for your account",
  passwordLabel = "Password",
  confirmPasswordLabel = "Re-type Password",
  submitLabel = "Save"
}: {
  title?: string;
  subtitle?: string;
  passwordLabel?: string;
  confirmPasswordLabel?: string;
  submitLabel?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reset_token = searchParams.get("reset_token") ?? "";

  const { mutate: resetPassword, isPending } = useResetPassword();

  const formik = useFormik({
    initialValues: { new_password: "", confirm_password: "" },
    validationSchema,
    onSubmit: (values) => {
      resetPassword(
        { payload: { reset_token, new_password: values.new_password.trim() } },
        {
          onSuccess: () => {
            toast.success("Password reset successfully");
            router.replace("/auth/sign-in");
          },
          onError: handleMutationError
        }
      );
    }
  });

  return (
    <form className={authStyles.formRoot} onSubmit={formik.handleSubmit}>
      <div className={authStyles.formSection}>
        <div className={authStyles.titleBlock}>
          <h1 className={authStyles.title}>{title}</h1>
          {subtitle ? <p className={authStyles.subtitle}>{subtitle}</p> : null}
        </div>

        <div className={authStyles.resetFields}>
          <PasswordInput
            id="new_password"
            label={passwordLabel}
            required
            value={formik.values.new_password}
            setValue={(val) => formik.setFieldValue("new_password", val)}
            error={
              formik.touched.new_password
                ? formik.errors.new_password
                : undefined
            }
            showToggle={false}
            startIcon={
              <LockKeyhole
                className={authStyles.inputIcon}
                aria-hidden="true"
              />
            }
            placeholder="Enter Password"
          />

          <PasswordInput
            id="confirm_password"
            label={confirmPasswordLabel}
            required
            value={formik.values.confirm_password}
            setValue={(val) => formik.setFieldValue("confirm_password", val)}
            error={
              formik.touched.confirm_password
                ? formik.errors.confirm_password
                : undefined
            }
            showToggle={false}
            startIcon={
              <LockKeyhole
                className={authStyles.inputIcon}
                aria-hidden="true"
              />
            }
            placeholder="Retype Password"
          />
        </div>
      </div>

      <Button
        type="submit"
        size="xl"
        className={authStyles.ctaButton}
        disabled={isPending}
      >
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;

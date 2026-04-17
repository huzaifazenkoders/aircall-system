"use client";

import { useFormik } from "formik";
import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { useChangePassword } from "@/features/auth/services/authService";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";
import { handleMutationError } from "@/utils/handleMutationError";

const validationSchema = Yup.object({
  new_password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Please confirm your password")
});

const DialerAuthResetPasswordForm = ({
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

  const { mutate: resetPassword, isPending } = useChangePassword();

  const formik = useFormik({
    initialValues: { new_password: "", confirm_password: "" },
    validationSchema,
    onSubmit: (values) => {
      resetPassword(
        {
          payload: {
            new_password: values.new_password.trim()
          }
        },
        {
          onSuccess: () => {
            toast.success("Password changed successfully");
            router.replace("/dialer/assigned-lead");
          },
          onError: handleMutationError
        }
      );
    }
  });

  return (
    <form className={dialerAuthStyles.formRoot} onSubmit={formik.handleSubmit}>
      <div className={dialerAuthStyles.formSection}>
        <div className={dialerAuthStyles.titleBlock}>
          <h1 className={dialerAuthStyles.title}>{title}</h1>
          {subtitle ? (
            <p className={dialerAuthStyles.subtitle}>{subtitle}</p>
          ) : null}
        </div>

        <div className={dialerAuthStyles.fieldStack}>
          <PasswordInput
            id="dialer-auth-reset-password"
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
            startIcon={<LockKeyhole aria-hidden="true" />}
            placeholder="Enter Password"
          />

          <PasswordInput
            id="dialer-auth-reset-confirm-password"
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
            startIcon={<LockKeyhole aria-hidden="true" />}
            placeholder="Retype Password"
          />
        </div>
      </div>

      <Button type="submit" size="xl" disabled={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
};

export default DialerAuthResetPasswordForm;

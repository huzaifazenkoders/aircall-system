"use client";

import { Mail } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";
import { useForgotPassword } from "@/features/auth/services/authService";
import { handleMutationError } from "@/utils/handleMutationError";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required")
    .isValidEmail("Email is not valid")
});

const DialerAuthForgotPasswordForm = () => {
  const router = useRouter();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: (values) => {
      const email = values.email.trim().toLowerCase();
      forgotPassword(
        { payload: { email } },
        {
          onSuccess: () => {
            toast.success("OTP sent to your email");
            router.replace(
              `/dialer-auth/verify-code?email=${encodeURIComponent(email)}`
            );
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
          <h1 className={dialerAuthStyles.title}>Forgot Password</h1>
          <p className={dialerAuthStyles.subtitle}>
            Enter your email address and we&apos;ll send you an otp to reset
            your password
          </p>
        </div>

        <TextInput
          id="dialer-auth-forgot-email"
          label="Email address"
          required
          value={formik.values.email}
          setValue={(val) => formik.setFieldValue("email", val)}
          placeholder="john.doe@email.com"
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : undefined
          }
          startIcon={<Mail aria-hidden="true" />}
        />
      </div>

      <Button type="submit" size="xl" disabled={isPending}>
        {isPending ? "Sending..." : "Send Code"}
      </Button>
    </form>
  );
};

export default DialerAuthForgotPasswordForm;

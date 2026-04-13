"use client";

import React from "react";
import { Mail } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { authStyles } from "@/features/auth/styles/authStyles";
import { useForgotPassword } from "../services/authService";
import { handleMutationError } from "@/utils/handleMutationError";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required")
});

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: (values) => {
      forgotPassword(
        { payload: { email: values.email.trim() } },
        {
          onSuccess: () => {
            toast.success("OTP sent to your email");
            router.push(
              `/auth/verify-code?email=${encodeURIComponent(values.email)}`
            );
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
          <h1 className={authStyles.title}>Forgot Password</h1>
          <p className={authStyles.subtitle}>
            Enter your email address and we&apos;ll send you an otp to reset
            your password
          </p>
        </div>

        <TextInput
          id="email"
          label="Email address"
          value={formik.values.email}
          setValue={(val) => formik.setFieldValue("email", val)}
          placeholder="john.doe@email.com"
          error={formik.touched.email ? formik.errors.email : undefined}
          startIcon={
            <Mail className={authStyles.inputIcon} aria-hidden="true" />
          }
        />
      </div>

      <Button
        type="submit"
        size="xl"
        className={authStyles.ctaButton}
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Code"}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;

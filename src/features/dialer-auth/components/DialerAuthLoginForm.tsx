"use client";

import Link from "next/link";
import { LockKeyhole, Mail } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next/client";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import TextInput from "@/components/ui/text-input";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";
import { useLogin } from "@/features/auth/services/authService";
import { handleMutationError } from "@/utils/handleMutationError";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required")
    .isValidEmail("Email is not valid"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
});

const DialerAuthLoginForm = () => {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      login(
        {
          payload: {
            email: values.email.trim().toLowerCase(),
            password: values.password
          }
        },
        {
          onSuccess: (res) => {
            toast.success("Logged in successfully");
            setCookie("token", res.data.token);
            if (res.data.has_reset_password) {
              router.replace("/dialer-auth/set-password");
            } else {
              router.replace("/dialer/assigned-lead");
            }
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
          <h1 className={dialerAuthStyles.title}>Welcome Back!</h1>
          <p className={dialerAuthStyles.subtitle}>
            Login to your account and manage your leads
          </p>
        </div>

        <div className={dialerAuthStyles.fieldStack}>
          <TextInput
            id="dialer-auth-email"
            label="Email address"
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

          <div className="flex flex-col gap-2">
            <PasswordInput
              id="dialer-auth-password"
              label="Password"
              value={formik.values.password}
              setValue={(val) => formik.setFieldValue("password", val)}
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
              startIcon={<LockKeyhole aria-hidden="true" />}
              placeholder="Enter password"
            />

            <div className={dialerAuthStyles.helperRow}>
              <Link
                href="/dialer-auth/forgot-password"
                className={dialerAuthStyles.helperLink}
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" size="xl" disabled={isPending}>
        {isPending ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
};

export default DialerAuthLoginForm;

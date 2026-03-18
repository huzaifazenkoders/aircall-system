"use client";

import React from "react";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";

const ForgotPasswordForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const [email, setEmail] = React.useState("john.doe@email.com");

  return (
    <form
      className={cn("w-full", "max-w-114", "space-y-10")}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <div className={cn("space-y-8")}>
        <div className={cn("space-y-1.5")}>
          <h1
            className={cn("text-[28px]", "font-semibold", "text-text-primary")}
          >
            Forgot Password
          </h1>
          <p className={cn("text-base", "text-text-secondary")}>
            Enter your email address and we&apos;ll send you an otp to reset
            your password
          </p>
        </div>

        <TextInput
          id="email"
          label="Email address"
          value={email}
          setValue={setEmail}
          placeholder="john.doe@email.com"
          startIcon={
            <Mail className={cn("size-5", "text-primary")} aria-hidden="true" />
          }
        />
      </div>

      <Button type="submit" size="xl" className={cn("w-full")}>
        Send Code
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;

"use client";

import React from "react";
import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { cn } from "@/lib/utils";

const ResetPasswordForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const [password, setPassword] = React.useState("*********");
  const [confirmPassword, setConfirmPassword] = React.useState("*********");

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
          <h1 className={cn("text-[28px]", "font-semibold", "text-text-primary")}>
            Reset password
          </h1>
          <p className={cn("text-base", "text-text-secondary")}>
            Create a new password for your account
          </p>
        </div>

        <div className={cn("space-y-5")}>
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            setValue={setPassword}
            startIcon={
              <LockKeyhole className={cn("size-5", "text-primary")} aria-hidden="true" />
            }
          />

          <PasswordInput
            id="confirmPassword"
            label="Re-type Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            startIcon={
              <LockKeyhole className={cn("size-5", "text-primary")} aria-hidden="true" />
            }
          />
        </div>
      </div>

      <Button type="submit" size="xl" className={cn("w-full")}>
        Save
      </Button>
    </form>
  );
};

export default ResetPasswordForm;

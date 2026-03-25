"use client";

import Link from "next/link";
import { LockKeyhole, Mail } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import TextInput from "@/components/ui/text-input";
import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";

const DialerAuthLoginForm = () => {
  const [email, setEmail] = React.useState("john.doe@email.com");
  const [password, setPassword] = React.useState("*********");

  return (
    <form className={dialerAuthStyles.formRoot}>
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
            value={email}
            setValue={setEmail}
            placeholder="john.doe@email.com"
            startIcon={<Mail className={dialerAuthStyles.inputIcon} aria-hidden="true" />}
            labelClassName={dialerAuthStyles.inputLabel}
            className={dialerAuthStyles.inputField}
          />

          <div className="flex flex-col gap-2">
            <PasswordInput
              id="dialer-auth-password"
              label="Password"
              value={password}
              setValue={setPassword}
              startIcon={
                <LockKeyhole
                  className={dialerAuthStyles.inputIcon}
                  aria-hidden="true"
                />
              }
              labelClassName={dialerAuthStyles.inputLabel}
              className={dialerAuthStyles.inputField}
            />

            <div className={dialerAuthStyles.helperRow}>
              <Link href="/dialer-auth/forgot-password" className={dialerAuthStyles.helperLink}>
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" size="xl" className={dialerAuthStyles.button}>
        Log in
      </Button>
    </form>
  );
};

export default DialerAuthLoginForm;

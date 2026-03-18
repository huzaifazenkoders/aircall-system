"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";

const LoginForm = () => {
  const [email, setEmail] = React.useState("john.doe@email.com");
  const [password, setPassword] = React.useState("*********");

  return (
    <div className={cn("w-full", "max-w-114", "space-y-10")}>
      <div className={cn("space-y-8")}>
        <div className={cn("space-y-1.5")}>
          <h1
            className={cn("text-[28px]", "font-semibold", "text-text-primary")}
          >
            Welcome Back!
          </h1>
          <p className={cn("text-base", "text-text-secondary")}>
            Login to your account and manage your leads
          </p>
        </div>

        <div className={cn("space-y-4.5")}>
          <TextInput
            id="email"
            label="Email address"
            value={email}
            setValue={setEmail}
            placeholder="john.doe@email.com"
            startIcon={
              <svg
                className={cn("size-5", "text-primary")}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="m5 7 7 5 7-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />

          <div className={cn("space-y-2")}>
            <PasswordInput
              id="password"
              label="Password"
              value={password}
              setValue={setPassword}
              startIcon={
                <svg
                  className={cn("size-5", "text-primary")}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 10V8a5 5 0 0 1 10 0v2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              }
            />
            <div className={cn("flex", "justify-end")}>
              <Link href="/auth/forgot-password" className={cn("text-sm", "font-medium", "text-secondary")}>
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" size="xl" className={cn("w-full")}>
        Log in
      </Button>
    </div>
  );
};

export default LoginForm;

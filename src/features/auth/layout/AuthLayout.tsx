import React from "react";

import { cn } from "@/lib/utils";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("min-h-screen", "w-full", "flex")}>
      <div
        className={cn(
          "w-full md:w-1/2",
          "bg-[url('/assets/auth/auth-bg.png')]",
          "bg-cover",
          "bg-center",
          "flex flex-col gap-2",
          "pl-[50px] pt-[100px]"
        )}
      >
        <h1>Where Lead Routing Meets Smart Calling</h1>
        <p>
          Centralize outbound calling, manage priority lists, and optimize lead
          distribution all in one streamlined platform built for
          high-performance sales teams.
        </p>
      </div>
      <div className={cn("w-full md:w-1/2", "flex center")}>{children}</div>
    </div>
  );
};

export default AuthLayout;

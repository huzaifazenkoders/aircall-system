import React from "react";

import { cn } from "@/lib/utils";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("min-h-screen", "w-full", "grid", "grid-cols-1", "md:grid-cols-2")}>
      <div
        className={cn(
          "hidden md:flex",
          "bg-[url('/assets/auth/auth-bg.png')]",
          "bg-cover",
          "bg-center",
          "flex-col",
          "gap-5",
          "px-12",
          "pt-24"
        )}
      >
        <h1 className={cn("max-w-xl", "text-5xl", "font-semibold", "leading-[1.1]", "text-brand-accent")}>
          Where Lead Routing Meets Smart Calling
        </h1>
        <p className={cn("max-w-xl", "text-base", "leading-6", "text-text-inverse-muted")}>
          Centralize outbound calling, manage priority lists, and optimize lead
          distribution all in one streamlined platform built for
          high-performance sales teams.
        </p>
      </div>
      <div className={cn("flex", "min-h-screen", "w-full", "flex-col", "bg-background")}>{children}</div>
    </div>
  );
};

export default AuthLayout;

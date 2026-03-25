"use client";

import React from "react";

import { cn } from "@/lib/utils";
import AppSidebar from "@/components/custom/app-shell/AppSidebar";
import AppTopbar from "@/components/custom/app-shell/AppTopbar";

const AppShell = ({
  children,
  activeKey,
  className
}: {
  children: React.ReactNode;
  activeKey?:
    | "dashboard"
    | "list"
    | "users"
    | "groups"
    | "workflows"
    | "logs"
    | "settings";
  className?: string;
}) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <div className="mx-auto grid min-h-screen w-full grid-cols-1 gap-6 p-3 lg:grid-cols-[300px_1fr]">
        <AppSidebar activeKey={activeKey} />
        <div className="flex min-w-0 flex-col">
          <AppTopbar />
          <main className="flex min-h-0 flex-1 flex-col px-1 pt-8 container mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppShell;

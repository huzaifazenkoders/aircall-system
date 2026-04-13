"use client";

import React from "react";
import { MenuIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import AppSidebar from "@/components/custom/app-shell/AppSidebar";
import AppTopbar from "@/components/custom/app-shell/AppTopbar";

const AppShell = ({
  children,
  activeKey,
  className
}: {
  children: React.ReactNode;
  activeKey?: "list" | "users" | "groups" | "workflows" | "logs" | "settings";
  className?: string;
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] transition-transform duration-300 lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <AppSidebar activeKey={activeKey} onClose={() => setSidebarOpen(false)} mobile />
      </div>

      <div className="mx-auto grid min-h-screen w-full grid-cols-1 gap-6 p-3 lg:grid-cols-[300px_1fr]">
        {/* Desktop sidebar */}
        <AppSidebar activeKey={activeKey} />

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2 lg:hidden mb-2">
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-muted"
            >
              <MenuIcon className="size-6" />
            </button>
          </div>
          <AppTopbar />
          <main className="flex min-h-0 flex-1 flex-col px-1 pt-2 container mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppShell;

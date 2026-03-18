"use client";

import Link from "next/link";
import React from "react";
import { Clock3Icon, HexagonIcon, HomeIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const AircallShell = ({
  children,
  activeKey = "home",
  className,
}: {
  children: React.ReactNode;
  activeKey?: "home" | "history";
  className?: string;
}) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <div className="mx-auto flex min-h-screen w-full gap-10 p-6">
        <AircallSidebar activeKey={activeKey} />

        <div className="flex min-w-0 flex-1 flex-col">
          <AircallTopbar />
          <main className="flex min-h-0 flex-1 flex-col px-2 pt-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

const AircallSidebar = ({ activeKey }: { activeKey: "home" | "history" }) => {
  const navItems = [
    { key: "home", label: "Home", href: "/assigned-lead", icon: HomeIcon },
    { key: "history", label: "History", href: "#", icon: Clock3Icon },
  ] as const;

  return (
    <aside className="sticky top-6 flex h-[calc(100vh-48px)] w-28 flex-col rounded-3xl bg-[image:var(--gradient)] px-4 py-8 text-white">
      <div className="grid place-items-center">
        <div className="grid size-12 place-items-center rounded-2xl bg-brand-accent/20">
          <HexagonIcon className="size-7 text-brand-accent" aria-hidden="true" />
        </div>
      </div>

      <nav className="mt-16 flex flex-1 flex-col gap-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeKey;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-2 rounded-2xl px-2 py-4 text-xs font-medium text-text-inverse-muted transition-colors hover:bg-white/10 hover:text-white",
                isActive && "bg-white text-primary"
              )}
            >
              <Icon
                className={cn(
                  "size-5",
                  isActive ? "text-secondary" : "text-text-inverse-muted"
                )}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

const AircallTopbar = () => {
  return (
    <header className="flex items-center justify-end border-b border-border pb-5">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center overflow-hidden rounded-lg bg-muted text-sm font-semibold text-foreground">
          JS
        </div>
        <div className="leading-tight">
          <div className="text-sm text-muted-foreground">Hello</div>
          <div className="text-sm font-semibold">James Smith</div>
        </div>
      </div>
    </header>
  );
};

export default AircallShell;


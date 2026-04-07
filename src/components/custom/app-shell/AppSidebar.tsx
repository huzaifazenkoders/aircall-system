"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ListIcon,
  UsersIcon,
  UsersRoundIcon,
  WorkflowIcon,
  PhoneCallIcon,
  SettingsIcon,
  HexagonIcon
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { key: "list", label: "List Management", href: "/list", icon: ListIcon },
  { key: "users", label: "Users", href: "/users", icon: UsersIcon },
  { key: "groups", label: "Groups", href: "/groups", icon: UsersRoundIcon },
  {
    key: "workflows",
    label: "Workflows",
    href: "/workflows",
    icon: WorkflowIcon
  },
  { key: "logs", label: "Call Logs", href: "/call-logs", icon: PhoneCallIcon },
  { key: "settings", label: "Settings", href: "#", icon: SettingsIcon }
] as const;

const AppSidebar = ({
  activeKey
}: {
  activeKey?:
    | "dashboard"
    | "list"
    | "users"
    | "groups"
    | "workflows"
    | "logs"
    | "settings";
}) => {
  const pathname = usePathname();
  const resolvedActiveKey =
    activeKey ??
    (pathname.startsWith("/users")
      ? "users"
      : pathname.startsWith("/groups")
        ? "groups"
        : pathname.startsWith("/workflows")
          ? "workflows"
          : pathname.startsWith("/call-logs")
            ? "logs"
            : pathname.startsWith("/list")
              ? "list"
              : "dashboard");

  return (
    <aside className="sticky top-3 hidden h-[calc(100vh-24px)] flex-col rounded-xl bg-[image:var(--gradient)] px-7 py-8 text-white lg:flex">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-brand-accent/20">
          <HexagonIcon
            className="size-6 text-brand-accent"
            aria-hidden="true"
          />
        </div>
        <div className="text-[26px] font-semibold tracking-tight">
          Aircall System
        </div>
      </div>

      <nav className="mt-12 flex flex-1 flex-col gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === resolvedActiveKey;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-text-inverse-muted transition-colors hover:bg-white/10 hover:text-white",
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

export default AppSidebar;

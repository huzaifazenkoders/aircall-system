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
  HexagonIcon,
  XIcon
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
  activeKey,
  mobile,
  onClose
}: {
  activeKey?:
    | "dashboard"
    | "list"
    | "users"
    | "groups"
    | "workflows"
    | "logs"
    | "settings";
  mobile?: boolean;
  onClose?: () => void;
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
    <aside className={cn(
      "h-[calc(100vh-24px)] flex-col rounded-xl bg-[image:var(--gradient)] px-7 py-8 text-white",
      mobile ? "flex h-full rounded-none" : "sticky top-3 hidden lg:flex"
    )}>
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-brand-accent/20">
          <HexagonIcon
            className="size-8 text-[#2FBF9B]"
            aria-hidden="true"
            fill="#2FBF9B"
          />
        </div>
        <div className="text-[26px] font-semibold tracking-tight">
          Aircall System
        </div>
        {mobile && onClose && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="ml-auto rounded-lg p-1 hover:bg-white/10"
          >
            <XIcon className="size-5" />
          </button>
        )}
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

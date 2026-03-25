"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HexagonIcon,
  HistoryIcon,
  HomeIcon,
  PhoneCallIcon,
  PhoneForwardedIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { dialerShellStyles } from "@/features/dialer/styles/dialerStyles";

const navItems = [
  { href: "#", label: "Home", icon: HomeIcon, key: "home" },
  {
    href: "/dialer/callback-schedules",
    label: "Callbacks",
    icon: PhoneForwardedIcon,
    key: "callbacks",
  },
  { href: "#", label: "My Lists", icon: PhoneCallIcon, key: "lists" },
  {
    href: "/dialer/call-history",
    label: "History",
    icon: HistoryIcon,
    key: "history",
  },
] as const;

const DialerSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className={dialerShellStyles.sidebar}>
      <div className={dialerShellStyles.logoWrap}>
        <HexagonIcon className="size-8 fill-brand-accent text-brand-accent" />
      </div>

      <nav className={dialerShellStyles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            (item.key === "callbacks" && pathname.startsWith("/dialer/callback-schedules")) ||
            (item.key === "history" && pathname.startsWith("/dialer/call-history"));

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(dialerShellStyles.navItem, isActive && dialerShellStyles.navItemActive)}
            >
              <Icon className="size-7 lg:size-8" strokeWidth={2} />
              <span className={dialerShellStyles.navLabel}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DialerSidebar;


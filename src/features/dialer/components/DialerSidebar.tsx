"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HexagonIcon,
  HistoryIcon,
  HomeIcon,
  PhoneCallIcon,
  PhoneForwardedIcon
} from "lucide-react";
import Logo from "@/../public/assets/dialer-auth/logo.svg";

import { cn } from "@/lib/utils";
import { dialerShellStyles } from "@/features/dialer/styles/dialerStyles";
import Image from "next/image";

const navItems = [
  { href: "/dialer/assigned-lead", label: "Home", icon: HomeIcon, key: "home" },
  {
    href: "/dialer/callback-schedules",
    label: "Callbacks",
    icon: PhoneForwardedIcon,
    key: "callbacks"
  },
  { href: "/dialer/my-list", label: "My Lists", icon: PhoneCallIcon, key: "lists" },
  {
    href: "/dialer/call-history",
    label: "History",
    icon: HistoryIcon,
    key: "history"
  }
] as const;

const DialerSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className={dialerShellStyles.sidebar}>
      <div className={dialerShellStyles.logoWrap}>
        <Image src={Logo} alt="" width={38} height={34} />
      </div>

      <nav className={dialerShellStyles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                dialerShellStyles.navItem,
                isActive && dialerShellStyles.navItemActive
              )}
            >
              <Icon className="size-5 text-white lg:size-6" strokeWidth={1.5} />
              <span className={dialerShellStyles.navLabel}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DialerSidebar;

"use client";

import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

const AuthBackLink = ({
  href = "/auth/sign-in",
  label = "Back"
}: {
  href?: string;
  label?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex",
        "items-center",
        "gap-2",
        "text-sm",
        "font-medium",
        "text-text-primary",
        "transition-colors",
        "hover:text-secondary"
      )}
    >
      <ArrowLeft className={cn("size-4")} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
};

export default AuthBackLink;


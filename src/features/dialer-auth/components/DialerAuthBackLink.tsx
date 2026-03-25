"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { dialerAuthStyles } from "@/features/dialer-auth/styles/dialerAuthStyles";

const DialerAuthBackLink = ({
  href = "/dialer-auth",
  label = "Back",
}: {
  href?: string;
  label?: string;
}) => {
  return (
    <Link href={href} className={dialerAuthStyles.backLink}>
      <ArrowLeft className={dialerAuthStyles.backIcon} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
};

export default DialerAuthBackLink;

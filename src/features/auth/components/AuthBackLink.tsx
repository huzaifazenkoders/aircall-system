"use client";

import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";

import { authStyles } from "@/features/auth/styles/authStyles";

const AuthBackLink = ({
  href = "/dialer/auth/sign-in",
  label = "Back"
}: {
  href?: string;
  label?: string;
}) => {
  return (
    <Link href={href} className={authStyles.backButton}>
      <ArrowLeft className={authStyles.backIcon} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
};

export default AuthBackLink;

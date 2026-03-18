"use client";

import React from "react";

import { assignedLeadStyles as s } from "@/features/assigned-leads/styles/assignedLeadStyles";

export const AssignedLeadSectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={s.sectionTitle}>{children}</div>;
};

export const AssignedLeadInfo = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div>
      <div className={s.infoLabel}>{label}</div>
      <div className={s.infoValue}>{value}</div>
    </div>
  );
};


"use client";

import React from "react";
import LeadDetailsContent from "@/features/list/views/LeadDetailsContent";

const LeadDetailsView = () => {
  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-1 flex-col">
      <div className="rounded-2xl bg-card shadow-xs ring-1 ring-border">
        <LeadDetailsContent />
      </div>
    </div>
  );
};

export default LeadDetailsView;

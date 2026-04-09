"use client";

import React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import LeadDetailsContent from "@/features/list/views/LeadDetailsContent";
import { Lead } from "@/features/list/types/leadTypes";

const LeadDetailsDialog = ({
  lead,
  open,
  onOpenChange,
  fromListId
}: {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fromListId?: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-[1400px] overflow-auto custom-scrollbar rounded-lg p-0">
        <LeadDetailsContent lead={lead} onBack={() => onOpenChange(false)} fromListId={fromListId} />
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsDialog;

"use client";

import React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import LeadDetailsContent from "@/features/list/views/LeadDetailsContent";
import { Lead } from "@/features/list/types/leadTypes";

const LeadDetailsDialog = ({
  lead,
  open,
  onOpenChange
}: {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-[1400px] overflow-auto custom-scrollbar rounded-lg p-0">
        <LeadDetailsContent lead={lead} onBack={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsDialog;

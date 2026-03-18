"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import LeadDetailsModalContent from "@/features/list/views/LeadDetailsModalContent";

const LeadDetailsModalView = () => {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="max-w-6xl">
        <LeadDetailsModalContent mode="modal" />
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsModalView;


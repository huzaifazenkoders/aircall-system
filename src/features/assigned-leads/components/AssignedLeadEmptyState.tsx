"use client";

import Image from "next/image";
import NoImage from "@/../public/assets/dialer/no-assigned-lead.png";

import { Button } from "@/components/ui/button";
import { assignedLeadStyles as s } from "@/features/assigned-leads/styles/assignedLeadStyles";

const AssignedLeadEmptyState = () => {
  return (
    <div className={s.emptyWrap}>
      <Image
        src={NoImage}
        alt="No calls assigned"
        width={340}
        height={240}
        priority
      />
      <div className={s.emptyTitle}>No Calls Assigned</div>
      <p className={s.emptySubtitle}>
        You are currently not assigned to any active calls. When a lead becomes
        available, it will automatically appear here.
      </p>
      <Button className={s.emptyButton}>Refresh Queue</Button>
    </div>
  );
};

export default AssignedLeadEmptyState;

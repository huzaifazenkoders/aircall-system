import React from "react";
import { Suspense } from "react";

import AssignedLeadView from "@/features/assigned-leads/views/AssignedLeadView";

const page = () => {
  return (
    <Suspense fallback={null}>
      <AssignedLeadView />
    </Suspense>
  );
};

export default page;

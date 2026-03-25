import React from "react";

import WorkflowDetailsView from "@/features/workflows/views/WorkflowDetailsView";

const page = async ({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) => {
  const { workflowId } = await params;

  return <WorkflowDetailsView workflowId={workflowId} />;
};

export default page;

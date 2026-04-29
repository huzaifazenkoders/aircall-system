import React, { Suspense } from "react";

import ListManagementView from "@/features/list/views/ListManagementView";

const page = () => {
  return (
    <Suspense>
      <ListManagementView />
    </Suspense>
  );
};

export default page;


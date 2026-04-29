import React, { Suspense } from "react";

import GroupsView from "@/features/groups/views/GroupsView";

const page = () => {
  return (
    <Suspense>
      <GroupsView />
    </Suspense>
  );
};

export default page;

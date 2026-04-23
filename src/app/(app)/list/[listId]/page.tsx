import React, { Suspense } from "react";

import ListDetailsView from "@/features/list/views/ListDetailsView";

const page = () => {
  return (
    <Suspense>
      <ListDetailsView />
    </Suspense>
  );
};

export default page;


import React, { Suspense } from "react";

import SetPasswordView from "@/features/auth/views/SetPasswordView";

const page = () => {
  return (
    <Suspense>
      <SetPasswordView />
    </Suspense>
  );
};

export default page;

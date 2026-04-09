import React, { Suspense } from "react";

import ResetPasswordView from "@/features/auth/views/ResetPasswordView";

const page = () => {
  return (
    <Suspense>
      <ResetPasswordView />
    </Suspense>
  );
};

export default page;

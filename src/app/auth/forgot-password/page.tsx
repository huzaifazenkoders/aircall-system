import React, { Suspense } from "react";

import ForgotPasswordView from "@/features/auth/views/ForgotPasswordView";

const page = () => {
  return (
    <Suspense>
      <ForgotPasswordView />
    </Suspense>
  );
};

export default page;


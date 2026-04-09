import React, { Suspense } from "react";

import VerifyCodeView from "@/features/auth/views/VerifyCodeView";

const page = () => {
  return (
    <Suspense>
      <VerifyCodeView />
    </Suspense>
  );
};

export default page;

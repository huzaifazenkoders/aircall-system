import { Suspense } from "react";

import DialerAuthVerifyCodeView from "@/features/dialer-auth/views/DialerAuthVerifyCodeView";

const page = () => {
  return (
    <Suspense>
      <DialerAuthVerifyCodeView />
    </Suspense>
  );
};

export default page;

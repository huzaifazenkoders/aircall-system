import { Suspense } from "react";

import DialerAuthForgotPasswordView from "@/features/dialer-auth/views/DialerAuthForgotPasswordView";

const page = () => {
  return (
    <Suspense>
      <DialerAuthForgotPasswordView />
    </Suspense>
  );
};

export default page;

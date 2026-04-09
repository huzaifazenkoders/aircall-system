import { Suspense } from "react";

import DialerAuthResetPasswordView from "@/features/dialer-auth/views/DialerAuthResetPasswordView";

const page = () => {
  return (
    <Suspense>
      <DialerAuthResetPasswordView />
    </Suspense>
  );
};

export default page;
